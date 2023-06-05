import category from "./schemas/category";
import feature from "./schemas/feature";
import product from "./schemas/product";
import tags from "./schemas/tags";
import varients from "./schemas/varient";

const schemas = [product,category,tags,varients,feature];

const schema = [...schemas];

export default schema;