using CheeseWizSociety.Models;

namespace CheeseWizSociety.Repositories
{
    public interface IUsersRepository
    {
        void AddUser(Users user);
        void DeleteUser(int id);
        List<Users> GetAllUsers();
        Users GetUserByFirebaseUid(string FirebaseUid);
        Users GetUserById(int id);
        void UpdateUser(Users user);
    }
}