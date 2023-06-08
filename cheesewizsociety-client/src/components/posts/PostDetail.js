import { CardLink } from "reactstrap"

export const PostDetail = () => {
    const [post, setPost] = useState({
        
    })

    return (
        <Card
            style={{
                width: '18rem'
            }}
            >
            <CardLink>
                <img
                    alt="Card"
                    src="https://picsum.photos/300/200"
                />
            </CardLink>
            <CardBody>
                <CardTitle tag="h5">
                Card title
                </CardTitle>
                <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
                >
                Card subtitle
                </CardSubtitle>
                <CardText>
                Some quick example text to build on the card title and make up the bulk of the card‘s content.
                </CardText>
                <Button>
                Button
                </Button>
            </CardBody>
        </Card>
    )
}