namespace CheeseWizSociety.Models;

public class Users
{
    public int Id { get; set; }
    public string FirebaseUid { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string ImageUrl { get; set; }
    public string Type { get; set; }
    public List<Cheeses>? Cheese { get; set;}
}
