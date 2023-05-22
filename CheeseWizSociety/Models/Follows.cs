namespace CheeseWizSociety.Models;

public class Follows
{
    public int Id { get; set; }
    public int FollowerId { get; set; }
    public int FollowedId { get; set; }
}
