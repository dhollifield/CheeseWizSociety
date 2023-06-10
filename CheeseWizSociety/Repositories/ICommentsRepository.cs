using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface ICommentsRepository
    {
        void AddComment(Comments comment);
        void DeleteComment(int id);
        List<Comments> GetAllComments();
        List<Comments> GetCommentsByPostId(int PostId);
        void UpdateComment(Comments comment);
    }
}