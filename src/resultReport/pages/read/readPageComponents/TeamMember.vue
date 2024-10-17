<template>
  <v-card-text>
    <h2 class="text-h5 mb-4">팀 구성</h2>
    <v-simple-table class="team-table">
      <template v-slot:default>
        <tbody>
          <tr v-for="(member, index) in teamMembers" :key="index">
            <td class="equal-width">{{ member.department }}</td>
            <td class="equal-width">{{ member.name }}</td>
            <td class="equal-width">{{ member.role }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card-text>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    teamMembers: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.team-table {
  width: 100%;
}

.equal-width {
  width: 33.33%;
  padding: 12px;
  text-align: center;
}
</style>