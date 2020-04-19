<template>
  <v-flex>
    <v-list-item dense>
      <div>
        <strong class="blue--text">Реквизиты проекта</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Название проекта"
            class="inputD"
            list="name_prj_list"
            type="text"
            v-model="rekv.name_prj"
            hide-details
            clearable
          ></v-text-field>
          <datalist id="name_prj_list">
            <option>Узел коммерческого учёта тепловой энергии, теплоносителя</option>
            <option>Узел технологического учёта тепловой энергии, теплоносителя</option>
            <option>Индивидуальный узел учета тепловой энергии, теплоносителя</option>
            <option>Узел коммерческого учёта холодного водоснабжения</option>
            <option>Автоматизированный узел управления</option>
          </datalist>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="Шифр"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.cod"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field
            dense
            label="Проектная организация"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.name_ooo"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="ГИП"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.GIP"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sign_gip"
            accept="image/*"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="Разраб"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.razr"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sign_razr"
            accept="image/*"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="Проверил"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.prov"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sign_prov"
            accept="image/*"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="Т.контр"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.tcontr"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sign_tcontr"
            accept="image/*"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="4">
          <v-text-field
            dense
            label="Н.контр"
            class="inputD"
            type="text"
            hide-details
            v-model="rekv.ncontr"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-file-input
            class="inputD"
            dense
            hide-details
            name="sign_ncontr"
            accept="image/*"
            multiple
            label="File input"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <div>
        <strong class="blue--text">Реквизиты объекта</strong>
      </div>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Адрес"
            class="inputD"
            type="text"
            hide-details
            clearable
            v-model="rekv.adress"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Тип объекта"
            class="inputD"
            type="text"
            list="tip_obj_list"
            hide-details
            clearable
            v-model="rekv.tip_obj"
          ></v-text-field>
          <datalist id="tip_obj_list">
            <option>Многоквартирный жилой дом</option>
            <option>Школа</option>
            <option>Детский сад</option>
            <option>Административное здание</option>
          </datalist>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Заказчик"
            class="inputD"
            type="text"
            hide-details
            clearable
            v-model="rekv.zakazchik"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Абонент"
            class="inputD"
            type="text"
            hide-details
            clearable
            v-model="rekv.abonent"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Источник теплоснабжения"
            class="inputD"
            type="text"
            hide-details
            clearable
            v-model="rekv.istochnik"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item dense>
      <v-row align="center" justify="space-between">
        <v-col cols="12">
          <v-text-field
            dense
            label="Ресурсоснабжающая компания"
            class="inputD"
            type="text"
            hide-details
            clearable
            v-model="rekv.resurscomp"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
  </v-flex>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },

  computed: {
    ...mapState({
      rekv: state => state.Rekv
    })
  },
  watch: {
    rekv: {
      handler() {
        this.$store.dispatch("LOAD_REKV", this.rekv);
      },
      deep: true
    }
  },
  methods: {}
};
</script>

<style scoped>
.inputD {
  /* padding: 0; */
  font-size: 0.95em;
  font-weight: bold;
}

.inputD >>> .v-label {
  font-size: 11pt;
  /* color: rgb(16, 60, 182); */
  font-weight: normal;
  /* opacity: 0.5; */
}
.inputD >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputD >>> input::-webkit-outer-spin-button,
.inputD >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
