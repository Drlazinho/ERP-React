// import React, { useState } from 'react';

// import {
//   Box,
//   Button,
//   FormControl,
//   FormHelperText,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { Modal } from '@mui/material';
// import { Link } from 'react-router-dom';
// import Lottie from 'react-lottie';
// import animationData from '../../lotties/Block.json';
// import HomeIcon from '@mui/icons-material/Home';

// export default function ModalAcessoRestrito({
//   open,
//   onClose,
//   error,
//   LiberarAcesso,
// }) {
//   // const style = {
//   //     position: 'absolute',
//   //     top: '50%',
//   //     left: '50%',
//   //     transform: 'translate(-50%, -50%)',
//   //     width: 400,
//   //     height: '50%',
//   //     overflow: 'scroll',
//   //     backgroundColor: 'rgba(0,0,0, 0.72)',
//   //     border: '2px solid #000',
//   //     boxShadow: 24,
//   // };

//   const [password, setPassword] = useState('');

//   const animationLottieOption = {
//     loop: true,
//     autoplay: true,
//     animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };

//   return (
//     <Modal
//       show={open}
//       onClose={onClose}
//       aria-labelledby="modal-modal-title"
//       centered
//       aria-describedby="modal-modal-description"
//       // show={showModal}
//       // size="lg"
//       style={{ backgroundColor: 'rgba(0,0,0)' }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           flexDirection: 'column',
//           p: 4,
//         }}
//       >
//         <Lottie options={animationLottieOption} height={100} width={100} />
//         <Typography align="center">ACESSO RESTRITO</Typography>
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             gap: 2,
//             mb: 8,
//           }}
//         >
//           <FormControl>
//             <TextField
//               id="outlined-password-input"
//               type="password"
//               autoComplete="current-password"
//               variant="standard"
//               error={error}
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               InputProps={{
//                 autoComplete: 'off',
//               }}
//             />
//             {error ? (
//               <FormHelperText id="outlined-password-input" error>
//                 Senha Incorreta. (Consulte o Setor de Inteligência)
//               </FormHelperText>
//             ) : (
//               <FormHelperText id="outlined-password-input">
//                 Digite a Senha
//               </FormHelperText>
//             )}
//           </FormControl>
//         </Box>
//         <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//           <Button
//             sx={{ width: '200px' }}
//             onClick={() => LiberarAcesso(password)}
//             color="success"
//             variant="contained"
//           >
//             Liberar
//           </Button>
//           <Link to={'/principal'}>
//             <Button
//               sx={{ width: '200px' }}
//               color="warning"
//               variant="contained"
//               startIcon={<HomeIcon />}
//             >
//               Ir p/ Principal
//             </Button>
//           </Link>
//         </Box>
//       </Box>
//     </Modal>
//   );
// }
