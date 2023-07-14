import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "my fisrt book",
    description: "the first book i ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "my second book",
    description: "the second book i ever wrote",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            title={item.title}
            price={item.price}
            description={item.description}
            id={item.id}
            key={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
