import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Button, CardLink } from "reactstrap";
import "../user/User.css";

export const UserProfile = () => {
    const [user, setUser] = useState({
        userName: '',
        imageUrl: '',
        cheese: []
    })
    
    const { id } = useParams();

    useEffect(() => {
        const fetchUserWithFavCheese = async () => {
            const response = await fetch (`https://localhost:7241/api/Users/GetUserWithFavCheese/${id}`)
            const user = await response.json()
            setUser(user)
        }
        fetchUserWithFavCheese()
        console.log(user)
    }, [])

    return (
        <>
        <h1 className="user-profile-page-title">Cheese Wiz Society Member</h1>
        <div className="user-profile">
            <div className="user-details">
                <img 
                    className="user-profile-image"
                    alt={user.userName}
                    src={user.imageUrl}
                />
                <h3>{user.userName}</h3>
            </div>
            <div className="fav-cheeses">
                <h5>Favorite Cheeses</h5>
                <ul>
                        {user.cheese.map((c) => {
                            return <>
                                <li>
                                    {c.cheeseName}
                                </li>
                            </> 
                        })}
                </ul>
            </div>

        <CardLink>
            <Button 
                color="dark"
                size="lg"
                className="profile-back-button"
                href={`/Posts`}>Back to Posts</Button>
        </CardLink>
        </div>
        </>
    )
}