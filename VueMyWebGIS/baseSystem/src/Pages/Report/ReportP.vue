 <template>
    <layout>
      <a-layout-content>
          <a-form
            ref="formRef"
            name="advanced_search"
            class="ant-advanced-search-form"
            :model="formState"
            @finish="onFinish">
            <a-row :gutter="24">
              <template v-for="i in 3" :key="i">
                <a-col v-show="expand || i <= 6" :span="8">
                  <a-form-item
                    :name="`field-${i}`"
                    :label="`field-${i}`"
                    :rules="[{ required: true, message: 'input something' }]"
                  >
                    <a-input v-model:value="(formState as any)[`field-${i}`]" placeholder="placeholder"></a-input>
                  </a-form-item>
                </a-col>
              </template>
            </a-row>
            <a-row>
              <a-col :span="24" style="text-align: right">
                <a-button type="primary" html-type="submit">Search</a-button>
                <a-button style="margin: 0 8px" @click="() => (formRef as any).resetFields()">Clear</a-button>
              </a-col>
            </a-row>
          </a-form>
      </a-layout-content>
      <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
            <a-table :data-source="data">
              <a-table-column-group>
                <template #title><span style="color: #1890ff">Name</span></template>
                <a-table-column key="firstName" data-index="firstName">
                  <template #title><span style="color: #1890ff">First Name</span></template>
                </a-table-column>
                <a-table-column key="lastName" title="Last Name" data-index="lastName" />
              </a-table-column-group>
              <a-table-column key="age" title="Age" data-index="age" />
              <a-table-column key="address" title="Address" data-index="address" />
              <a-table-column key="tags" title="Tags" data-index="tags">
                <template #default="{ text: tags }">
                  <span>
                    <a-tag v-for="tag in tags" :key="tag" color="blue">{{ tag }}</a-tag>
                  </span>
                </template>
              </a-table-column>
              <a-table-column key="action" title="Action">
                <template #default="{ record }">
                  <span>
                    <a>Action 一 {{ record.firstName }}</a>
                    <a-divider type="vertical" />
                    <a>Delete</a>
                  </span>
                </template>
              </a-table-column>
            </a-table>
      </a-layout-content>
    </layout>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import layout from "../Layout.vue"
import type { FormInstance } from 'ant-design-vue';
import { getReportData } from "../../api/index";
const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const data = ref([{}]);

getReportData().then(res => {
  data.value = res.data;
  //console.log(res.data);
})

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({});
const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
};

</script>
<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>

