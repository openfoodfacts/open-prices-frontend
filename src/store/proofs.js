import { defineStore } from 'pinia';

export const useProofsStore = defineStore({
  id: 'proofs',
  state: () => ({
    proofs: []
  }),
  actions: {
    addProof(proof) {
      if (!this.proofs.some(existingProof => existingProof.id === proof.id)) {
        this.proofs.push(proof)
      }
    },
    removeProof(proofId) {
      this.proofs = this.proofs.filter(proof => proof.id !== proofId);
    }
  }
});