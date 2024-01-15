// Import necessary dependencies from React and MUI (Material-UI)
import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Header from "../../components/Header";
import { useQuery } from "@apollo/client";
import { PRODUCTS_WITH_STATS } from "../../utils/queries";

// Product component representing a single product card
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  yearlySalesTotal,
  yearlyTotalSoldUnits
}) => {
  // Access MUI theme and manage the expanded state of the card
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    // Product card styling and structure using MUI Card components
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem"
      }}
    >
      {/* Card content section */}
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant='h5' component='div'>
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant='body2'>{description}</Typography>
      </CardContent>

      {/* Card actions section */}
      <CardActions>
        <Button
          variant='primary'
          size='small'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      {/* Collapsible section with additional information */}
      <Collapse
        in={isExpanded}
        timeout='auto'
        unmountOnExit
        sx={{ color: theme.palette.secondary[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {yearlySalesTotal}</Typography>
          <Typography>
            Yearly Units Sold This Year: {yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Products component displaying a list of products
const Products = () => {
  // Fetch product data using the useGetProductsQuery hook
  const { loading, data } = useQuery(PRODUCTS_WITH_STATS);
  // Check if the screen size is non-mobile
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Return JSX for rendering the Products component
  return (
    <Box m='1.5rem 2.5rem'>
      {/* Header component with title and subtitle */}
      <Header title='PRODUCTS' subtitle='See your list of products.' />

      {/* Render product cards or display loading message */}
      {data?.productsWithStats || !loading ? (
        <Box
          mt='20px'
          display='grid'
          gridTemplateColumns='repeat(4, minmax(0, 1fr))'
          justifyContent='space-between'
          rowGap='20px'
          columnGap='1.33%'
          sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
        >
          {/* Map through product data and render individual Product components */}
          {data?.productsWithStats.map(
            ({ productId, yearlySalesTotal, yearlyTotalSoldUnits }) => (
              <Product
                key={productId._id}
                _id={productId._id}
                name={productId.name}
                description={productId.description}
                price={productId.price}
                rating={productId.rating}
                category={productId.category}
                supply={productId.supply}
                yearlySalesTotal={yearlySalesTotal}
                yearlyTotalSoldUnits={yearlyTotalSoldUnits}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

// Export the Products component as the default export
export default Products;
