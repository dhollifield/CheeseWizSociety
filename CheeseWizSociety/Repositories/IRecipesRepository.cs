using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface IRecipesRepository
    {

        void AddRecipe(Recipes recipe);
        void DeleteRecipe(int id);
        List<Recipes> GetAllRecipes();
        Recipes GetRecipeById(int id);
        void UpdateRecipe(Recipes recipe);
    }
}