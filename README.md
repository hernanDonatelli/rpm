<h1>Proyecto Ecommerce Vue.js</h1>
<p>Proyecto personal de una app ecommerce para el curso de Vue.js de Coderhouse. Se simula una Tienda Gourmet online con modalidad de envío a domicilio. El sitio es Full Responsive, adaptado para mobile, tablet y desktop.</p>
<p>El proyecto funcionando: https://clinquant-eclair-bd6726.netlify.app/</p>

<h2>Tecnologías Utilizadas</h2>

<ul>
    <li>Html5</li>
    <li>Css3</li>
    <li>Vue.js v2.6.14</li>
    <li>Vue Router v3.5.1</li>
    <li>Vuex v3.6.2</li>
    <li>Vuetify v2.6.0</li>
    <li>Vue Toasted v1.1.28</li>
    <li>MockAPI (backend)</li>
</ul>

<h2>Usabilidad</h2>
<p>
El sistema provee de 2 clases de usuarios: Administrador y Cliente. Cada uno de ellos tienen diferentes menúes, que serán visibles de acuerdo al rol que poseen.
</p>

<h3>Usuario Administrador</h3>
<p><strong>User:</strong> admin@coder.com</p>
<p><strong>Pass:</strong> 111111</p>
<p>El usuario Administrador posee un menu diferente al de un usuario-cliente, cuyos items son:</p>
<ul>
    <li>
    Productos: posee un listado de todos los productos de la App, pudiendo crear nuevos, modificar y eliminar los existentes.
    </li>
    <li>
    Usuarios: listado de usuarios con los datos de registración y con la opción de cambiar el rol de determinado usuario, ya sea de Admin a Cliente o viceversa mediante un "switch".
    </li>
    <li>
    Pedidos: aquí se listan los pedidos de los clientes, los cuales tienen 2 fases: pagados y enviados. Estas funcionalidades se habilitan mediante un "switch": cuando abonen se habilita el Envío a domicilio. Cuando se envia, la fila se resalta el fondo para entender que el pedido está completado.
    </li>
</ul>

<h3>Usuario Cliente</h3>
<p><strong>User:</strong> user@coder.com</p>
<p><strong>Pass:</strong> 222222</p>
<p>El usuario Cliente posee un menu con los siguientes items:</p>
<ul>
    <li>
    Productos: Aqui se listan todos los productos del ecommerce. Puede agregarlos al carrito de compras, puede ampliar el producto para ver mas detalles del mismo. Tambien puede filtrar una busqueda por nombre, precio y marca, individuales o en conjunto.
    </li>
    <li>
    Carrito: en el carrito puede modificar cantidades, eliminar items individualmente o vaciar el carrito. Al hacer estas acciones el valor total de la compra varía de acuerdo a las cantidades y precios unitarios del producto. Si continúa la app le pide una confirmación y se procede a realizar la compra, pudiendo ver en el siguiente apartado su pedido realizado y en que estado se encuentra.
    </li>
    <li>
    Cuenta: en este apartado el usuario ve sus datos de cuando se registró, los cuales puede editar. Tambien puede observar su historial de pedidos, y el estado en el cual estos se encuentran (pagado-enviado).
    </li>
</ul>

<h2>Autor</h2>
<ul>
    <li>Hernán Donatelli</li>
</ul>