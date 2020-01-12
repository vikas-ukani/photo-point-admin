<!--suppress ALL -->
<template>
  <div>
      <pre>
        {{stockDetails}}
      </pre>
    <table class="table table-hover" v-if="stockDetails.length ">
      <thead>
      <tr>
        <th>#</th>
        <th>Size</th>
        <th>Color</th>
        <th>Sale Price</th>
        <th>MRP</th>
        <th>Stock</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
      <tr :key="index" v-for="(stockList, index) in stockDetails">
        <td>{{index + 1}}</td>
        <td>
          <input
            class="form-control"
            disabled
            name="common_product_attribute_size_name"
            type="text"
            v-model="stockList.common_product_attribute_size_name"
          />
        </td>
        <td>
          <input
            class="form-control"
            disabled
            name="common_product_attribute_color_name"
            type="text"
            v-model="stockList.common_product_attribute_color_name"
          />
        </td>
        <td>
          <pre>{{errors.has(`stock_sale_price_${index}`)}}</pre>
          <input
            :name="'sale_price' + index "
            class="form-control"
            placeholder="Enter Sale Price "
            type="text"
            v-model="stockList.sale_price"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`sale_price${index}`)">

          </span>
          <span class="help-block" v-show="`sale_price${index}`">{{ errors.first(`sale_price${index}`) }}
          </span>

          <!--            v-validate="'required'"-->
        </td>
        <td>
          <input
            :name="'mrp_price' +index "
            class="form-control"
            placeholder="Enter MRP Price "
            type="text"
            v-model="stockList.mrp_price"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`mrp_price${index}`)">
          </span>
          <span class="help-block" v-show="`mrp_price${index}`">{{ errors.first(`mrp_price${index}`) }}
          </span>
        </td>
        <td>
          <input
            :name="'stock_available' +index "
            class="form-control"

            placeholder="Number of available stock "
            type="text"
            v-model="stockList.stock_available"
            v-validate="{required:true}"
          />
          <span aria-hidden="true"
                class="glyphicon glyphicon-remove form-control-feedback"
                v-show="errors.has(`stock_available${index}`)">
          </span>
          <span class="help-block" v-show="`stock_available${index}`">{{ errors.first(`stock_available${index}`) }}
          </span>
        </td>
        <td>
          <button
            @click="$parent.removeItemFromStockDetails(index)"
            class="btn btn-link"
            type="button"
          >Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "ProductStockDetailsTable",
    props: ['stockDetails'],


  }
</script>
