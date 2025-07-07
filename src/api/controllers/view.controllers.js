import Products from "../models/products.models.js";

export const vistaListado = async(req, res) => {
    try{
        const respuestaProductos = await Products.SelectAllProducts();
        res.render("index", {
          title: "Listado productos",
          products: respuestaProductos[0]
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    } 
}

export const vistaConsultarId =  async(req, res) => {
    res.render("consultar", {
        title: "Consultar producto por id"
    })
}

export const vistaCrearProducto = async(req, res) => {
    res.render("crear", {
        title: "Crear producto"
    })
}

export const vistaModificarProducto = async(req, res) => {
    res.render("modificar", {
        title: "Modificar producto por id"
    })
}

export const vistaEliminarProducto = async(req, res) => {
    res.render("eliminar", {
        title: "Eliminar producto por id"
    })
}