using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface ICheesesRepository
    {
        void AddCheese(Cheeses cheese);
        void DeleteCheese(int id);
        List<Cheeses> GetAllCheeses();
        Cheeses GetCheeseById(int id);
        void UpdateCheese(Cheeses cheese);
    }
}