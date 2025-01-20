<script lang="ts">
    import type { Debate } from "$lib/interfaces/backend.interface";
    import {
        displayIsoDate,
    } from "$lib/utils/displayUtils";

    export let debate: Debate;

  </script>

  <h3>{debate.type } {debate.session }
    <i class="fa fa-calendar" aria-hidden="true"></i>
    {displayIsoDate(debate.schedule)}
  </h3>