
import { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

const productosIniciales = [
  {
    id: 1,
    nombre: 'Manta Abrazo',
    categoria: 'Mantas',
    precio: 45000,
    imagen: '/src/assets/manta-rosa.png',
    descripcion: 'Manta tejida a crochet, realizada con lana calidad premium 100% acrílica, suave y acogedora. Medidas: 150 x 180 cm.',
    colores: ['#EBC5D2', '#D9C6B2', '#B7C9B5'],
    stock: 0,
    tallas: [],
  },
  {
    id: 2,
    nombre: 'Cardigan Aurora',
    categoria: 'Cardigans',
    precio: 35000,
    imagen: '/src/assets/chaleco-tejido.png',
    descripcion: 'Cardigan de hilo 100% acrílico, tejido a crochet, calidad premium, delicado, suave y cómodo.',
    colores: ['#D9C6B2', '#59443F', '#C98291'],
    stock: 0,
    tallas: [
      { nombre: 'S', stock: 0 },
      { nombre: 'M', stock: 0 },
      { nombre: 'L', stock: 0 },
    ],
  },
  {
    id: 3,
    nombre: 'Bufanda Amatista',
    categoria: 'Bufandas',
    precio: 10000,
    imagen: '/src/assets/bufanda-artesanal.png',
    descripcion: 'Bufanda tejida a crochet, hecha de lana 100% acrílica, cálida y suave, perfecta para complementar tu estilo.',
    colores: ['#B7C9B5', '#E8DDAF', '#8A7770'],
    stock: 0,
    tallas: [],
  },
  {
    id: 4,
    nombre: 'Kimono Encanto',
    categoria: 'Kimonos',
    precio: 28000,
    imagen: '/src/assets/cardigan-crochet.png',
    descripcion: 'Kimono tejido a crochet, elaborado con hilo 100% algodón premium, liviano y delicado, ideal para darle un toque especial a tu look.',
    colores: ['#EBC5D2', '#D9C6B2', '#B7C9B5'],
    stock: 0,
    tallas: [
      { nombre: 'S', stock: 0 },
      { nombre: 'M', stock: 0 },
      { nombre: 'L', stock: 0 },
    ],
  },
]

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    const productosGuardados = localStorage.getItem('productos')
    return productosGuardados
      ? JSON.parse(productosGuardados)
      : productosIniciales
  })

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  return (
    <ProductContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductContext)
}
