<template>
  <div>
    <!-- Dialog para crear productos -->
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="700px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="create-button mt-5"
            color="brown darken-1"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Crear Producto
          </v-btn>
        </template>
        <v-card id="formCreate">
          <v-card-title>
            <span class="text-h5 title-create"><span>Crear</span>Producto</span>
          </v-card-title>

          <v-divider color="brown darken-1" />

          <v-card-text>
            <v-container>
              <v-row>
                <v-col class="py-0" xs="12" sm="3" lg="4">
                  <v-text-field
                    v-model="createNombre"
                    label="Nombre"
                  ></v-text-field>
                </v-col>

                <v-col class="py-0" xs="12" sm="3" lg="4">
                  <v-text-field
                    v-model="createMarca"
                    label="Marca"
                  ></v-text-field>
                </v-col>

                <v-col class="py-0" xs="12" sm="3" lg="4">
                  <v-text-field
                    v-model="createCategoria"
                    label="Categoria"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0" cols="12">
                  <v-text-field
                    v-model="createImg"
                    hint="Ej: https://dominio.com/imagen.jpg"
                    label="URL Imagen"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0" cols="12">
                  <v-textarea
                    v-model="createDescripcion"
                    name="input-7-1"
                    label="Descripcion del producto"
                    hint="Letras, numeros, signos, etc..."
                    row-height="5"
                    counter
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="py-0" xs="6">
                  <v-text-field
                    v-model="createStock"
                    label="Stock"
                  ></v-text-field>
                </v-col>
                <v-col class="py-0" xs="6">
                  <v-text-field
                    v-model.number="createPrecio"
                    label="Precio"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="pb-15">
                <v-col class="py-0" cols="6">
                  <v-btn
                    block
                    color="red accent-3 white--text"
                    class="mr-4"
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>
                </v-col>
                <v-col class="py-0" cols="6">
                  <v-btn
                    :disabled="!emptyForm"
                    block
                    color="teal accent-3"
                    class="mr-4"
                    @click="postCreateProduct"
                  >
                    Enviar
                  </v-btn>
                </v-col>
                <v-col cols="12">
                  <transition name="fade-transition">
                    <div v-if="!emptyForm" id="alertCreate" class="mt-3">
                      <v-alert text type="error" icon="mdi-cloud-alert">
                        <span class="text-caption">Tienes campos sin completar para el ingreso!</span>
                      </v-alert>
                    </div>
                  </transition>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>

      </v-dialog>
    </v-row>

    <v-row>
          <v-col xs="12" sm="10" lg="6" class="mx-auto">
            <div id="createSuccess" class="hidden">
              <v-alert
                prominent
                text
                type="success"
                icon="mdi-checkbox-marked-circle"
              >
                <v-row class="align-center">
                  <v-col lg="12">
                    El Producto ha sido creado exitosamente!
                  </v-col>
                </v-row>
              </v-alert>
            </div>
          </v-col>
        </v-row>
  </div>
</template>


<script>
export default {
  name: "CreateProductsComponent.vue",
  data() {
    return {
      createNombre: "",
      createMarca: "",
      createImg: "",
      createPrecio: null,
      createStock: null,
      createCategoria: "",
      createDescripcion: "",
      dialog: false,
      emptyForm: true,
    };
  },
  methods: {
    postCreateProduct() {
      const newProduct = {
        nombre: this.createNombre,
        marca: this.createMarca,
        img: this.createImg,
        precio: this.createPrecio,
        stock: this.createStock,
        categoria: this.createCategoria,
        descripcion: this.createDescripcion,
        cantidad: 1,
        ingresado: new Date().toLocaleString()
      };

      if(!newProduct.nombre || !newProduct.marca || !newProduct.img || !newProduct.precio || !newProduct.stock || !newProduct.categoria || !newProduct.descripcion){
        this.emptyForm = false;

        setTimeout(() => {
          this.emptyForm = true;
        }, 3000);

      }else{
        const createProductAPI = async () => {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          };

          const postProduct = await fetch(
            "https://639c6ec816d1763ab149a523.mockapi.io/productos",
            options
          );
          const response = await postProduct.json();
          console.log(response);

          setTimeout(() => {
            const form = document.getElementById("formCreate");

            if (form) {
              this.dialog = false;
              document.getElementById("createSuccess").classList.remove("hidden");
              document.getElementById("createSuccess").classList.add("visible");
            }

            setTimeout(() => {
              document.getElementById("createSuccess").classList.remove("visible");
              document.getElementById("createSuccess").classList.add("hidden");
              window.location.reload();
            }, 1500);
          }, 2500);
        };
        createProductAPI();
      }
    },
  },
};
</script>

<style scoped>
#createSuccess.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 1s linear;
}
#createSuccess.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 1s, opacity 1s linear;
}
.title-create,
.title-create span {
  letter-spacing: 0.001rem;
  font-family: Roboto;
  text-transform: uppercase;
  color: #6d4c41;
  font-weight: 600;
  padding-left: .25rem;
}
.title-create span {
  font-weight: 200;
}
hr.theme--light.v-divider {
  display: block;
  height: 2px;
  width: 15%;
  border-color: unset;
  border: 1px solid #6d4c41;
  margin-left: 5%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>