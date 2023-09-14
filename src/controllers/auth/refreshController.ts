import Joi, { ValidationResult, Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { REFRESH_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import JwtService from '../../services/JwtService';
import CustomErrorHandler from '../../services/CustomErrorHandler';

interface RefreshRequest extends Request {
    body: {
        refresh_token: string;
    };
}

interface JwtPayload {
    _id: string;
    role?: string;
}

const refreshController = {
    async refresh(req: RefreshRequest, res: Response, next: NextFunction): Promise<Response | void> {
        // validation
        const refreshSchema: Schema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error }: ValidationResult = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        // database
        let refreshtoken;
        try {
            refreshtoken = await RefreshToken.findOne({ token: req.body.refresh_token });
            if (!refreshtoken) {
                return next(CustomErrorHandler.unAuthorized('Token de atualização inválido'));
            }

            let userId: string;
            try {
                if (!refreshtoken || !refreshtoken.token) {
                    return next(CustomErrorHandler.unAuthorized("Token de atualização inválido"));
                }

                const payload: JwtPayload = await JwtService.verify(refreshtoken.token, REFRESH_SECRET) as JwtPayload;
                userId = payload._id;
            } catch (err) {
                return next(CustomErrorHandler.unAuthorized('Token de atualização inválido'));
            }

            const user = await User.findOne({ _id: userId });
            if (!user) {
                return next(CustomErrorHandler.unAuthorized('Nenhum usuário encontrado!'));
            }

            // tokens
            const access_token: string = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token: string = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist
            await RefreshToken.create({ token: refresh_token });
            return res.json({ access_token, refresh_token });

        } catch (err) {
            return next(new Error('Algo deu errado ' + err));
        }
    }
};

export default refreshController;
