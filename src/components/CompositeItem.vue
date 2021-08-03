<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!isModifing">
      <h4 class="inline-block text-2xl font-bold">{{ this.song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        @click="isModifing = true"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="isModifing">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        @submit="update"
        :validation-schema="schema"
        :initial-values="{
          song_name: song.modified_name,
          genre: song.genre,
        }"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
          @input="updateUnsavedFlag(true)"
            name="song_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="song_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
          @input="updateUnsavedFlag(true)"
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          :disabled="in_submission"
          @click.prevent="isModifing = false"
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'CompositeItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    index: Number,
    updateSong: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      isModifing: false,
      schema: {
        song_name: 'required|min:3',
        genre: 'alphaSpaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait!Updating song info.',
    };
  },
  methods: {
    async update(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait! Updating song info.';

      try {
        await songsCollection.doc(this.song.docID).update({
          modified_name: values.song_name,
          genre: values.genre,
        });
      } catch (error) {
        this.alert_variant = 'bg-red-500';
        this.alert_message = 'Opps. Something went wrong please try again later!';
        this.in_submission = false;
        return;
      }
      this.updateSong(this.index, { modified_name: values.song_name, genre: values.genre });
      this.isModifing = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Success';
      this.in_submission = false;
      this.updateUnsavedFlag(false);
    },
    async deleteSong() {
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.original_name}`);
      await songRef.delete();
      this.updateUnsavedFlag(false);
      await songsCollection.doc(this.song.docID).delete();
      this.removeSong(this.index);
    },
  },
};
</script>
