namespace CheeseWizSociety.Models;

public class Recipes
{
    public int Id { get; set; }
    public string RecipeName { get; set; }
    public string ImageUrl { get; set; }
    public int RecipeTypeId { get; set; }
    public RecipeTypes? RecipeType { get; set; }
    public string Ingredients { get; set; }
    public string Instructions { get; set; }
    public int UserId { get; set; }
    public Users? User { get; set; }
}
