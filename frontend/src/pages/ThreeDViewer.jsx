import React, { useEffect, useState, useContext, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const ThreeDViewer = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id, token]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading Product...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Back Button */}
      <div className="p-4">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Product Info */}
      <h2 className="text-center text-3xl font-bold">{product.name}</h2>
      <p className="text-center mb-4 text-gray-700">
        Category: {product.category} | Price: ₹{product.price}
      </p>

      {/* 3D Model */}
      <div className="h-[80vh]">
        <Canvas camera={{ position: [0, 3, 5], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <Model url={product.modelPath} />
          </Suspense>
          <OrbitControls enableZoom />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDViewer;
