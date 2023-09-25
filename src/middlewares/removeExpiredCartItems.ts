import cron from 'node-cron';
import CartItem from "../models/cart";

async function removeExpiredCartItems() {
  try {
    const currentTime = new Date();
    await CartItem.deleteMany({ createdAt: { $lt: currentTime } });
    console.log('Itens do carrinho expirados removidos com sucesso.');
  } catch (error) {
    console.error('Erro ao remover itens do carrinho expirados:', error);
  }
}

// Agende a função para ser executada a dia
cron.schedule('0 0 * * *', removeExpiredCartItems); // Executa a cada dia


export default removeExpiredCartItems;