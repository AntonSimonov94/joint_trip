<template>

    <div v-if="userTrips.length !=0" style="width: 100%">

    <h1 class="personal-main-info-header">Текущие поездки как Водитель</h1>
    <!-- isset-drive -->

        <table class="table table-striped align-middle">
          <thead>
            <tr align="center">
                <th>№</th>
                <th>Дата поездки</th>
                <th>Откуда</th>
                <th>Куда</th>
                <th>Стоимость</th>
                <th>Кол-во мест</th>
                <th>Забронировано мест</th>
            </tr>
          </thead>
          <tbody v-for="(trip, index) in userTrips" :key="index">
            <tr align="center">
                <td rowspan="2">{{index + 1 }} <br>
                  <div class="dropdown">
                    <button class="btn btn-link button-non-outline" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-tsoyvi" aria-labelledby="dropdownMenuButton1">
                      <li><button class="dropdown-item" @click="endTripDriver(trip)">Завершить</button></li>
                      <li><button class="dropdown-item" @click="cancelTripDriver(trip)">Отменить</button></li>
                    </ul>
                  </div>
                </td>

                <td>
                  {{ formatDateTimeToRus(trip.date_depart) }}
                  <br> | <br>
                  {{ formatDateTimeToRus(trip.date_arrival) }}
                </td>
                <td>{{trip.from}}</td>
                <td>{{trip.to}}</td>
                <td>{{trip.place_cost}}</td>
                <td>{{trip.count_pass}}</td>
                <td>{{countPassengers(trip.user_passenger)}}</td>
            </tr>
            <tr class="table-success" align="center">
              <td colspan="6">
                <div v-for="(passenger, index) in trip.user_passenger" :key="index">
                  <div>
                    <button class="btn btn-link button-non-outline" title="Написать сообщение"
                      @click="viewMessengerModalWindow(passenger)">
                      <i class="fa fa-comments" aria-hidden="true"></i>
                    </button>
                    {{passenger.surname }} {{passenger.name }} {{passenger.patronymic }}
                        - {{ placeDeclensionCase(passenger.pivot.place_count) }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

    </div>
    <!--
    <div v-else class="personal-drive-empty">
        <h3 class="personal-drive-empty-text" id="drive-empty">Поездки не найдены</h3>
    </div>
    -->
          <!-- personal-drive-archive -->
        <div v-if="userTripsPassenger.length !=0" class="" style="width: 100%">
          <hr>
        <h1 class="personal-main-info-header">Текущие поездки как Пассажир</h1>

        <table class="table table-striped align-middle">
            <thead>
              <tr class="personal-drive-archive-header" align="center">
                  <th>№</th>
                  <th>Дата поездки</th>
                  <th>Откуда</th>
                  <th>Куда</th>
                  <th>Стоимость</th>
                  <th>Забронировано мест</th>
                  <th></th>
              </tr>
            </thead>
            <tbody v-for="(trip, index) in userTripsPassenger" :key="index">
            <tr align="center">
                <td rowspan="2">
                  {{index + 1 }}<br>
                  <div class="dropdown">
                    <button class="btn btn-link button-non-outline" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-tsoyvi" aria-labelledby="dropdownMenuButton1">
                      <li><button class="dropdown-item" @click="viewEndTripModalWindow(trip)">Завершить</button></li>
                      <li><button class="dropdown-item" @click="cancelTripPassenger(trip)">Отменить</button></li>
                    </ul>
                  </div>
                </td>
                <td>
                  {{ formatDateTimeToRus(trip.date_depart) }}
                  <br>|<br>
                  {{ formatDateTimeToRus(trip.date_arrival) }}
                </td>

                <td>{{trip.from}}</td>
                <td>{{trip.to}}</td>
                <td>{{trip.place_cost}}</td>
                <td>{{trip.pivot.place_count}}</td>
                <td>
                 <!-- <div v-for="(passenger, index) in trip.user_passenger" :key="index">
                  <div>{{passenger.surname }} {{passenger.name }} {{passenger.patronymic }} - {{ passenger.pivot.place_count }} </div>
                  </div> -->
                </td>
            </tr>

            <tr class="table-success" align="center">
              <td colspan="6">
                  <div>
                    <button class="btn btn-link button-non-outline" title="Написать сообщение"
                      @click="viewMessengerModalWindow(trip.user_driver)">
                      <i class="fa fa-comments" aria-hidden="true"></i>
                    </button>
                    Водитель {{trip.user_driver.surname }} {{trip.user_driver.name }} {{trip.user_driver.patronymic }}
                  </div>
              </td>
            </tr>

           </tbody>
        </table>
    </div>
    <h1 class="personal-main-info-header">Архив</h1>

<div v-if="userTripsАrchive.length !=0" style="width: 100%">

    <h1 class="personal-main-info-header">Поездки как Водитель</h1>
    <!-- isset-drive -->

        <table class="table table-striped align-middle">
          <thead>
            <tr align="center">
                <th>№</th>
                <th>Дата поездки</th>
                <th>Откуда</th>
                <th>Куда</th>
                <th>Стоимость</th>
                <th>Кол-во мест</th>
                <th>Забронировано мест</th>
            </tr>
          </thead>
          <tbody v-for="(trip, index) in userTripsАrchive" :key="index">
            <tr align="center">
                <td rowspan="2">{{index + 1 }} <br>
                  <div class="dropdown">
                    <button class="btn btn-link button-non-outline" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-tsoyvi" aria-labelledby="dropdownMenuButton1">
                      <li><button class="dropdown-item" @click="endTripDriver(trip)">Завершить</button></li>
                      <li><button class="dropdown-item" @click="cancelTripDriver(trip)">Отменить</button></li>
                    </ul>
                  </div>
                </td>

                <td>
                  {{ formatDateTimeToRus(trip.date_depart) }}
                  <br> | <br>
                  {{ formatDateTimeToRus(trip.date_arrival) }}
                </td>
                <td>{{trip.from}}</td>
                <td>{{trip.to}}</td>
                <td>{{trip.place_cost}}</td>
                <td>{{trip.count_pass}}</td>
                <td>{{countPassengers(trip.user_passenger)}}</td>
            </tr>
            <tr class="table-success" align="center">
              <td colspan="6">
                <div v-for="(passenger, index) in trip.user_passenger" :key="index">
                  <div>
                    <button class="btn btn-link button-non-outline" title="Написать сообщение"
                      @click="viewMessengerModalWindow(passenger)">
                      <i class="fa fa-comments" aria-hidden="true"></i>
                    </button>
                    {{passenger.surname }} {{passenger.name }} {{passenger.patronymic }}
                        - {{ placeDeclensionCase(passenger.pivot.place_count) }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

    </div>

        <div v-if="userTripsPassengerАrchive.length !=0" class="" style="width: 100%">
          <hr>
        <h1 class="personal-main-info-header">Поездки пассажиром</h1>

        <table class="table table-striped align-middle">
            <thead>
              <tr class="personal-drive-archive-header" align="center">
                  <th>№</th>
                  <th>Дата поездки</th>
                  <th>Откуда</th>
                  <th>Куда</th>
                  <th>Стоимость</th>
                  <th>Забронировано мест</th>
                  <th></th>
              </tr>
            </thead>
            <tbody v-for="(trip, index) in userTripsPassengerАrchive" :key="index">
            <tr align="center">
                <td rowspan="2">
                  {{index + 1 }}<br>
                </td>
                <td>
                  {{ formatDateTimeToRus(trip.date_depart) }}
                  <br>|<br>
                  {{ formatDateTimeToRus(trip.date_arrival) }}
                </td>

                <td>{{trip.from}}</td>
                <td>{{trip.to}}</td>
                <td>{{trip.place_cost}}</td>
                <td>{{trip.pivot.place_count}}</td>
                <td>
                 <!-- <div v-for="(passenger, index) in trip.user_passenger" :key="index">
                  <div>{{passenger.surname }} {{passenger.name }} {{passenger.patronymic }} - {{ passenger.pivot.place_count }} </div>
                  </div> -->
                </td>
            </tr>

            <tr class="table-success" align="center">
              <td colspan="6">
                  <div>
                    <button class="btn btn-link button-non-outline" title="Написать сообщение"
                      @click="viewMessengerModalWindow(trip.user_driver)">
                      <i class="fa fa-comments" aria-hidden="true"></i>
                    </button>
                    Водитель {{trip.user_driver.surname }} {{trip.user_driver.name }} {{trip.user_driver.patronymic }}
                  </div>
              </td>
            </tr>

           </tbody>
        </table>
    </div>

    <div class="personal-drive-empty isset-drive">
        <h2 class="personal-drive-empty-text" id="drive-empty">Поездки не найдены</h2>
    </div>

    <MessengerModalWindow
      ref="messengerModalWindow"
      :titleModalWindow="'Мессенджер'"
    />

    <EndTripModalWindow
    ref="endTripModalWindow"
    />

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MessengerModalWindow from '../messenger/messengerModalWindow.vue';
import EndTripModalWindow from '../modalWindows/endTripModalWindow.vue';

import DateMixin from '../../mixins/date';
import PlaceDeclensionCase from '../../mixins/placeDeclension';

export default {
  name: 'TripsUser',
  components: {
    MessengerModalWindow,
    EndTripModalWindow,
  },

  mixins: [DateMixin, PlaceDeclensionCase],
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['userTrips', 'userTripsАrchive', 'userTripsPassenger', 'userTripsPassengerАrchive']),
  },
  methods: {
    ...mapActions(['userTripsRequest', 'cancelTripDriverRequest', 'cancelTripPassengerRequest', 'endTripDriverRequest']),

    countPassengers(passengers) {
      // Здесь подсчитываем общее количество мест
      let countPassengers = 0;
      if (passengers) {
        passengers.forEach((passenger) => {
          countPassengers += passenger.pivot.place_count;
        });
      }

      return countPassengers;
    },

    viewMessengerModalWindow(user) {
      // const freePlaceCount = this.freePlaceCount(foundTrip);
      this.$refs.messengerModalWindow.openWindow(user);
    },

    viewEndTripModalWindow(trip) {
      this.$refs.endTripModalWindow.openWindow(trip);
    },

    async cancelTripDriver(trip) {
      if (window.confirm('Удалить поездку?')) {
        console.log(trip);
        const result = await this.cancelTripDriverRequest(trip);
        if (result) {
          this.userTripsRequest();
        }
      }
    },

    async cancelTripPassenger(trip) {
      if (window.confirm('Удалить поездку?')) {
        console.log(trip);
        const result = await this.cancelTripPassengerRequest(trip);
        if (result) {
          this.userTripsRequest();
        }
      }
    },

    async endTripDriver(trip) {
      if (window.confirm('Завершить поездку?')) {
        console.log(trip);
        const result = await this.endTripDriverRequest(trip);
        if (result) {
          this.userTripsRequest();
        }
      }
    },

  },
  mounted() {
    this.userTripsRequest();
  },

};

</script>

<style>

</style>
