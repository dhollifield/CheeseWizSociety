using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface IRecipeTypesRepository
    {
        void AddRecipeType(RecipeTypes recipeType);
        void DeleteRecipeType(int id);
        List<RecipeTypes> GetAllRecipeTypes();
        RecipeTypes GetRecipeTypeById(int id);
        void UpdateRecipeType(RecipeTypes recipeType);
    }
}