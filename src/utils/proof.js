import constants from '../constants'

function getProofTypeIcon(proofType) {
  return constants[`PROOF_TYPE_${proofType}_ICON`] || constants.PROOF_ICON
}

export {
  getProofTypeIcon
}
