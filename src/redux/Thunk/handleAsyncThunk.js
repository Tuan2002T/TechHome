const handleAsyncThunk = (builder, thunk, key) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state[key] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};

export default handleAsyncThunk;
