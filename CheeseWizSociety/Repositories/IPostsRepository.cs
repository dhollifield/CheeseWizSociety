using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface IPostsRepository
    {
        void AddPost(Posts post);
        void DeletePost(int id);
        List<Posts> GetAllPosts();
        List<Posts> GetAllPostsWithComments();
        Posts GetPostById(int id);
        List<Posts> GetPostByIdWithComments(int id);
        List<Posts> Hottest(bool sortDescending);
        List<Posts> Search(string criterion, bool sortDescending);
        void UpdatePost(Posts post);
    }
}