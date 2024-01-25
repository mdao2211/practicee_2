// Read.tsx
import  { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Button } from "@/components/ui/button";

  
interface Product {
    id: string;
    title: string;
    description: string;
}

function Read() {
    const { id } = useParams();
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/` + id)
            .then((res) => setData([res.data])) // Wrap the data in an array
            .catch((err) => console.log(err));
    }, [id]);

    if (data.length === 0) {
        return <div>Loading...</div>; // Add loading state or handle appropriately
    }

    const product = data[0]; // Assuming you are expecting a single product based on the provided code

    return (
        <div className="container">
            <div className="container p-5" key={product.id}>
                <p>ID: {product.id}</p>
                <p>TITLE: {product.title}</p>
                <p>DESCRIPTION: {product.description}</p>
                <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><Link to="/dashboard/product">Go to ProductPage</Link></button>     
            </div>
            <Link to={`/dashboard/product/update/` + id}><Button variant="outline">Go to edit</Button></Link>
        </div>
        
    );
}

export default Read;
