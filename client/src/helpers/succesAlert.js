import Swal from 'sweetalert2'

const alertSuccess = () => Swal.fire({
    title: 'Success process!',
    icon: 'success',
    confirmButtonText: 'Cool'
  })

export default alertSuccess