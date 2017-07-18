export const state = () => ({
  image: null
})

export const mutations = {
  copyImage (state, image) {
    state.image = image
  }
}
