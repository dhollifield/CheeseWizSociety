using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface ICommentsRepository
    {
        void AddComment(Comments comment);
        void DeleteComment(int id);
        List<Comments> GetAllComments();
        Comments GetCommentById(int id);
        void UpdateComment(Comments comment);
    }
}