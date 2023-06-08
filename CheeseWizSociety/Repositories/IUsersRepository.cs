using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface IUsersRepository
    {
        void AddUser(Users user);
        void DeleteUser(int id);
        List<Users> GetAllUsers();
        Users GetUserByEmail(string Email);
        Users GetUserByFirebaseUid(string FirebaseUid);
        Users GetUserById(int id);
        Users GetUserByIdWithFavCheeses(int id);
        void UpdateUser(Users user);
    }
}