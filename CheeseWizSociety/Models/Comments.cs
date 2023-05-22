namespace CheeseWizSociety.Models;

public class Comments
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int PostId { get; set; }
    public string Comment { get; set; }
}
