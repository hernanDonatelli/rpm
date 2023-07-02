<h1>Proyecto Website RPM Racing League</h1>
<p>Proyecto del website de la liga simracing RPM Racing League. El sitio es Full Responsive, adaptado para mobile, tablet y desktop.</p>
<p>El proyecto funcionando: https://websiterpm.netlify.app/#/</p>

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
El sistema registrará usuarios administradores y usuarios comunes. Cada uno de ellos tienen diferentes menúes, que serán visibles de acuerdo al rol que poseen.
</p>

<h3>Usuario Administrador</h3>
<p><strong>User:</strong> admin@coder.com</p>
<p><strong>Pass:</strong> 111111</p>
<p>El usuario Administrador posee un menu diferente al de un usuario-cliente, cuyos items son:</p>
<ul>
    <li>
    Torneos: posee un listado de todos los Torneos creados, pudiendo crear nuevos, modificar y eliminar los existentes.
    </li>
    <li>
    Usuarios: listado de usuarios con los datos de registración y con la opción de cambiar el rol de determinado usuario, ya sea de Admin a User o viceversa mediante un "switch".
    </li>
    <li>
    Compras/Inscripciones: aquí se listan las compras de los usuarios, ya sea inscripciones a los torneos o pagos voluntarios ("donaciones"). Hay 2 fases: pagados y cancelados. Estas funcionalidades se habilitan mediante un "switch": cuando abonen se habilita al usuario a participar de X torneo.
    </li>
</ul>

<h3>Usuario Normal</h3>
<p><strong>User:</strong> user@coder.com</p>
<p><strong>Pass:</strong> 222222</p>
<p>El usuario Cliente posee un menu con los siguientes items:</p>
<ul>
    <li>
    Carrito: en el carrito puede modificar cantidades, eliminar items individualmente o vaciar el carrito. Al hacer estas acciones el valor total de la compra varía de acuerdo a las cantidades y precios unitarios del producto. Si continúa la app le pide una confirmación y se procede a realizar la compra, pudiendo ver en el siguiente apartado su pedido realizado y en que estado se encuentra.
    </li>
    <li>
    Cuenta: en este apartado el usuario ve sus datos de cuando se registró, los cuales puede editar. Tambien puede observar su historial de pedidos, y el estado en el cual estos se encuentran (pagado-enviado).
    </li>
</ul>

<h2>Autor</h2>
<ul>
    <li>Studioatlantic</li>
</ul>
