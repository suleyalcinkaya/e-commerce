import React from 'react'

function PrimaryButton({children}) {
  return (
    <>
      <button className="w-96 py-6 px-6 bg-[#2DC071] text-[2rem] text-white font-semibold rounded-2xl">
        {children}
      </button>
    </>
  )
}

export default PrimaryButton