import * as React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Snackbar,
  Tooltip,
  Typography
} from '@mui/material'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
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
import { Course, Courses } from '../stores/course'
import { Cart, addToCart, removeFromCart } from '../stores/cart'
import { addToFavorite, removeFromFavorite } from '../stores/favorite'
import { useGetCoursesQuery } from '../stores/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

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

type Statuses = {
  [key: number]: string
}

export default function CourseCard({ id, name, instructor, prices, startDate, endDate, shortDetail, image }: { id: number, name: string, instructor: string, prices: Array<object>; startDate: string, endDate: string, shortDetail: string, image: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const [openFeedback, setOpenFeedback] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const { data } = useGetCoursesQuery();
  const cart = useSelector((state: RootState) => state.cart);
  const isAuthenticated = useSelector((state: RootState) => state.app.authenticated);
  const favorite = useSelector((state: RootState) => state.favorite);
  const user = useSelector((state: RootState) => state.app.user);
  const courses: Courses = data ?? [];
  const dispatch = useDispatch();
  const router = useRouter();

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
    if (isAuthenticated) {
      const employmentCategories: any = prices.map((i, v) => parseInt(Object.keys(i)[0], 10));

      let itemToAdd: Cart | undefined = undefined;
      if ((user.employment in prices)) { // cek apakah ada kecocokan status karir
        // dengan tipe harga training
        const courseSelected: Course = courses.find((x: Course) => x.id === id)!;
        const selectedPrice = prices[user.employment];
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else if ((employmentCategories.includes(7)) || (employmentCategories.includes(2))) { // cek apakah ada harga training
        // untuk tipe Umum || Karyawan
        const courseSelected: Course = courses.find((x) => x.id === id)!;
        const selectedPrice = courseSelected.prices.find((x) => x[2]) || courseSelected.prices.find((x) => x[7]);
        itemToAdd = {...courseSelected, price: selectedPrice as object}
      } else if (Object.keys(prices).length === 0) {
        const courseSelected = courses.find((x) => x.id === id)!;
        const selectedPrice: object = { 0: 0 };
        itemToAdd = {...courseSelected, price: selectedPrice}
      } else {
        // eslint-disable-next-line no-alert
        alert('Tidak ada harga yang cocok untuk Anda!');
        console.log(user.employment);
        console.log(prices);
      }
      console.log(itemToAdd)

      if (itemToAdd !== undefined) {
        dispatch(addToCart(itemToAdd));
        setFeedbackMessage("Added to cart")
        setOpenFeedback(true)
      }
    } else {
      router.push('/signin')
    }
  };

  const isCourseInCart = (id: number) => {
    const doesExist = cart.find(item => item.id === id);

    return doesExist;
  };

  const isCourseInFavorite = (id: number) => {
    const doesExist = favorite.find(item => item.id === id);

    return doesExist;
  };

  const handleRemoveFromCartClick = (id: number) => {
    dispatch(removeFromCart(id));
    setFeedbackMessage("Removed from cart")
    setOpenFeedback(true)
  };

  const handleAddToFavoriteClick = (id: number) => {
    const selectedCourse = courses.filter(course => {
      return course.id === id;
    });
    dispatch(addToFavorite(selectedCourse[0]))
    setFeedbackMessage("Added to favorite")
    setOpenFeedback(true)
  };

  const handleRemoveFromFavoriteClick = (id: number) => {
    dispatch(removeFromFavorite(id))
    setFeedbackMessage("Removed from favorite")
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
      <IconButton onClick={ () => handleAddToFavoriteClick(id) }>
        <FavoriteBorderIcon aria-label="Add to whishlist" />
      </IconButton>
    )
  });

  const RemoveFavoriteButton = React.forwardRef(function RemoveFavoriteButton(props, ref) {
    return (
      <IconButton onClick={ () => handleRemoveFromFavoriteClick(id) }>
        <FavoriteIcon aria-label="Remove from whishlist" />
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

  const statuses: Statuses = {
    1: 'Student/College student',
    2: 'Employee/Professional',
    3: 'Freelancer/Self-employed',
    4: 'Unemployed/Jobseeker',
    5: 'Teacher/Lecturer/Academics',
    6: 'Manager/Director/Enterpreneur',
    7: 'Public'
  };

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
        <Link href={`/details/${id}`}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </Link>
        <Typography>
          {instructor}
        </Typography>
      </CardContent>
      <CardActions>
        {
          isCourseInFavorite(id) ?
            <Tooltip title="Remove from favorites">
              <RemoveFavoriteButton />
            </Tooltip> :
            <Tooltip title="Add to favorites">
              <FavoriteButton />
            </Tooltip>
        }
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
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>
                {shortDetail}
          </Typography>
          <Typography paragraph>
                Date:
          </Typography>
          <Typography paragraph>
                {`${startDate} until ${endDate}`}
          </Typography>
          <Typography>
                Price:
          </Typography>
          {
            (prices.length > 0)
            ? prices.map((v, i) => (
              <Typography key={i}>
                {`${statuses[Object.keys(v) as unknown as number]}: Rp${Object.values(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`}
              </Typography>
            ))
            : <Chip label="Free" />
          }
        </CardContent>
      </Collapse>
      <ButtonFeedback title={feedbackMessage} />
    </Card>
  );
}