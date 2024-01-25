import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  // Don't forget to import axios

interface Product{
  id:string;
  title:string;
  description:string;
}

export default function Product() {
  //   const [loading, setLoading] = useState(false);
  //   const [products, setProducts] = useState([]);
  //   const [error, setError] = useState<string | null>(null);

  //   useEffect(() => {
  //     setLoading(true);
  //     setError(null);
  //     fetchProduct();
  //   }, []);

  //   async function fetchProduct() {
  //     try {
  //       const res = await fetch("http://localhost:3000/products");
  //       const data = await res.json();
  //       setProducts(data);
  //     } catch (error) {
  //       if (error instanceof Error) setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  function handleDelete(id: string){
    const confirmDelete = window.confirm("Do u like to delete?")
    if(confirmDelete){
      axios.delete("http://localhost:3000/products/" + id)
      .then(() => {
        alert("Delete successfully!"),
        navigate('/dashboard/product')
      })      
    }
  }


  const {
    isFetching,
    isError,
    error,
    data: products,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/products");
      console.log(response)
  
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
  
      // Check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }
  
      return response.json();
    },
  });
  
  if (isFetching) return <Loader2 className="animate-spin" />;
  if (isError) return <div>Error fetching products: {error.message}</div>;
  
  return (
    <>
      <div className="flex items-center w-full justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">Products</h1>
        <Link to="/dashboard/product/add">
          <Button className="ml-auto" size="sm">
            Add product
          </Button>
        </Link>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">id</TableHead>
              <TableHead className="hidden md:table-cell">title</TableHead>
              <TableHead className="hidden md:table-cell">
                description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: {
              description: ReactNode;
              id: Key | null | undefined; title: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}) => (
              <TableRow key={product.id}>
                <TableCell className="hidden md:table-cell">{product.id}</TableCell>                
                <TableCell className="hidden md:table-cell">{product.title}</TableCell>
                <TableCell className="hidden md:table-cell">{product.description}</TableCell>
                <td>
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(product.id)}>Delete</button>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"><Link to={`/dashboard/product/read/${product.id}`}>Detail</Link></button>
                
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
