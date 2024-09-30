<script lang="ts">
  import { writable } from "svelte/store";
  import {
    getFirstNonEmptyStatement,
    getFullStatement,
  } from "./statement-utils";
  import StatementItem from "./StatementItem.svelte";
  import "./page.css";

  let showFullStatement = writable(false);

  const toggleFullStatement = () => {
    showFullStatement.update((value) => !value);
  };

  const getStatementText = (doc: any, highlighting: any) => {
    return $showFullStatement
      ? getFullStatement(doc.statement, highlighting[doc.id].statement)
      : getFirstNonEmptyStatement(highlighting[doc.id].statement);
  };
  let data = writable(null);
  let queryTerm = "";
  let params = {
    indent: "true",
    df: "statement",
    hl: "true",
    q: "",
    facet: "true",
    "facet.field": "speaker_name",
  };

  // Function to handle the button click and fetch the JSON file
  const handleSearch = async () => {
    if (!queryTerm.trim()) {
      console.error("Search term is required");
      return;
    }

    params.q = queryTerm; // Set the query term in the parameters
    const apiUrl = `http://localhost:8010/solr/debates/select?${new URLSearchParams(params).toString()}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const json = await response.json();
        data.set(json); // Update the store with the fetched data
      } else {
        console.error("Error fetching JSON:", response.statusText);
      }
    } catch (error) {
      console.error("Error reading JSON:", error);
    }
  };

  // Function to reset the search result
  const handleReset = () => {
    queryTerm = ""; // Clear the input field
    data.set(null); // Reset the data
  };
</script>

<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<div class="container">
  <div class="input-container">
    <input
      type="text"
      id="query-input"
      bind:value={queryTerm}
      placeholder="Enter search term"
    />
    <button id="search-button" on:click={handleSearch}>Search</button>
    <button id="reset-button" on:click={handleReset}>Reset search</button>
  </div>
</div>

{#if $data}
  <div class="container">
    <!-- Facet Counts -->
    <div class="facets">
      <h3>Facet Counts</h3>
      {#if $data.facet_counts}
        {#each $data.facet_counts.facet_fields.speaker_name as facet, index}
          {#if index % 2 === 0}
            <div>
              {facet}: {$data.facet_counts.facet_fields.speaker_name[index + 1]}
            </div>
          {/if}
        {/each}
      {:else}
        <p>No facet counts available.</p>
      {/if}
    </div>

    <!-- Statements -->
    <div class="statements">
      {#if $data && $data.response && $data.response.docs}
        {#each $data.response.docs as doc}
          <StatementItem {doc} highlighting={$data.highlighting} />
        {/each}
      {:else}
        <p>No statements available.</p>
      {/if}
    </div>
  </div>
{/if}
