namespace CheeseWizSociety.Models;

public class Posts
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string ImageUrl { get; set; }
    public string Caption { get; set; }
    public DateTime DateCreated { get; set; }
    public int UserId { get; set; }
    public Users User { get; set; }
    public List<Comments> Comments { get; set; }
}
