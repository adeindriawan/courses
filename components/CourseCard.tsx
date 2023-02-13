import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Snackbar,
  Tooltip,
  Typography
} from '@mui/material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import {
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from '@mui/icons-material'
import {
  styled
} from '@mui/material/styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../stores'
import { baseURL } from '../config'
import { addCart, updateCart } from '../stores/cart'
import { useGetCoursesQuery } from '../stores/api'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean,
  onClick: React.MouseEventHandler<HTMLElement>,
  children: React.ReactNode
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  // eslint-disable-next-line react/react-in-jsx-scope
  return <IconButton { ...other } />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

export default function CourseCard({ id, name, image }: { id: number, name: string, image: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const { data } = useGetCoursesQuery();
  const cart = useSelector((state: RootState) => state.cart)
  const courses = data ?? [];
  const dispatch = useDispatch();

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenFeedback(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCartClick = (id: number) => {
    const selectedCourse = courses.filter(course => {
      return course.id === id;
    });
    dispatch(addCart(selectedCourse[0]));
    setFeedbackMessage("Added to cart")
    setOpenFeedback(true)
  };

  const isCourseInCart = (id: number) => {
    const doesExist = cart.find(item => item.id === id);

    return doesExist;
  };

  const handleRemoveFromCartClick = (id: number) => {
    dispatch(updateCart(id));
    setFeedbackMessage("Removed from cart")
    setOpenFeedback(true)
  };

  const handleFavoriteClick = (id: number) => {
    console.log(`course id ${id} added to favorite`);
    setFeedbackMessage("Added to favorite")
    setOpenFeedback(true)
  };

  const CartButton = React.forwardRef(function CartButton(props, ref) {
    return (
      <IconButton onClick={ () => handleAddToCartClick(id) }>
        <ShoppingCartIcon aria-label="Add to cart" />
      </IconButton>
    )
  });

  const RemoveCartButton = React.forwardRef(function RemoveCartButton(props, ref) {
    return (
      <IconButton onClick={ () => handleRemoveFromCartClick(id) }>
        <RemoveShoppingCartIcon aria-label="Remove from cart" />
      </IconButton>
    )
  })

  const FavoriteButton = React.forwardRef(function FavoriteButton(props, ref) {
    return (
      <IconButton onClick={ () => handleFavoriteClick(id) }>
        <FavoriteBorderIcon aria-label="Add to whishlist" />
      </IconButton>
    )
  });

  const ExpandMoreButton = React.forwardRef(function ExpandMoreButton(props, ref) {
    return (
      <ExpandMore
        expand={ expanded }
        onClick={ handleExpandClick }
        aria-expanded={ expanded }
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    )
  });

  const ButtonFeedback = ({ title }: { title: string}) => {
    return (
      <Snackbar
        open={openFeedback}
        autoHideDuration={6000}
        onClose={handleClose}
        message={title}
        action={action}
      />
    );
  }

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="img"
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={`${baseURL}images/course/${image}`}
        alt="random"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography>
          This is a media card. You can use this section to describe the
          content.
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Add to wishlist">
          <FavoriteButton />
        </Tooltip>
        {
          isCourseInCart(id) ?
            <Tooltip title="Remove from cart">
              <RemoveCartButton />
            </Tooltip> :
            <Tooltip title="Add to cart">
              <CartButton />
            </Tooltip>
        }
        <Tooltip title="Read details">
          <ExpandMoreButton />
        </Tooltip>
      </CardActions>
      <Collapse in={ expanded } timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add
                saffron and set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large,
                deep skillet over medium-high heat. Add chicken, shrimp
                and chorizo, and cook, stirring occasionally until
                lightly browned, 6 to 8 minutes. Transfer shrimp to a
                large plate and set aside, leaving chicken and chorizo
                in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                onion, salt and pepper, and cook, stirring often until
                thickened and fragrant, about 10 minutes. Add saffron
                broth and remaining 4 1/2 cups chicken broth; bring to a
                boil.
          </Typography>
          <Typography paragraph>
                Add rice and stir very gently to distribute. Top with
                artichokes and peppers, and cook without stirring, until
                most of the liquid is absorbed, 15 to 18 minutes. Reduce
                heat to medium-low, add reserved shrimp and mussels,
                tucking them down into the rice, and cook again without
                stirring, until mussels have opened and rice is just
                tender, 5 to 7 minutes more. (Discard any mussels that
                don’t open.)
          </Typography>
          <Typography>
                Set aside off of the heat to let rest for 10 minutes,
                and then serve.
          </Typography>
        </CardContent>
      </Collapse>
      <ButtonFeedback title={feedbackMessage} />
    </Card>
  );
}