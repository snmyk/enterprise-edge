import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Camera, Mic, MapPin, Clock, Search, Filter, ArrowLeft, Calendar } from 'lucide-react-native';
import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

export default function AllReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();
  const allReports = [
    {
      id: 1,
      title: 'Overflowing Bin',
      location: 'Main Street',
      time: '2 hours ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 50,
      image: 'https://img.huffingtonpost.com/asset/5c642e3f2500003502c88afb.jpeg?cache=QcnyC9W2zQ&ops=crop_0_1793_3346_3227%2Cscalefit_1440&format=webp',
    },
    {
      id: 2,
      title: 'Broken Container',
      location: 'Park Avenue',
      time: '1 day ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 75,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    },
    {
      id: 3,
      title: 'Recycling Bin Full',
      location: 'Downtown Mall',
      time: '1 week ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 60,
      image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recycling-hero-ca48975.jpg?quality=90&webp=true&resize=700,636',
    },
    {
      id: 4,
      title: 'Illegal Dumping Site',
      location: 'Riverside Drive',
      time: '2 weeks ago',
      status: 'Under Review',
      statusColor: '#8B5CF6',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 100,
      image: 'https://groundup.org.za/media/uploads/images/photographers/Chris%20Gilili/palm_springs_garbage.jpeg',
    },
    {
      id: 5,
      title: 'Damaged Waste Bin',
      location: 'Central Park',
      time: '3 weeks ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 45,
      image: 'https://www.ekurhuleni.gov.za/wp-content/uploads/2024/07/broken-240L-bin.jpg',
    },
    {
      id: 6,
      title: 'Recycling Contamination',
      location: 'Shopping Center',
      time: '1 month ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 80,
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAQsBfgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAECBAUDBwj/xABHEAABAwMCAwUFBAYIBQQDAAABAgMEAAUREiEGMUETIlFhcRQVMoGRB0JSoSMzksHR4TVDU1VigoOxFiRyc/AlNFRjF7Lx/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAIBAwQFBgf/xAAyEQACAgEDAgUDAgUFAQAAAAAAAQIDEQQSIQUxExQiQVEjMmEGcRWBkaHRM0JSsfAW/9oADAMBAAIRAxEAPwD0QeGeXKpfOo4p6tAlTjao8qfY0AIVLnuU/OoUgo0AdOmxqSV42UaiDtUtscqAOigle5He8ajuBg7iuecHyrpkkUAOMYwBikfAUwNSz1oAj18aZQydqmMHrSOPGgBkHG2KcY22piPCn3x/KgBZFPjaonzpDbqaAJYGOWfnUsdB8qig71LOPlUAOAR50luttI7RxQSkdTTOOobSSs4/fWRIdDz2t0FW3cSOSR/GqrLFEeEHIuruBVnsE4T0znJqpdYsiW0jKWilK0rQoqOUqB64p1h+PGL0dHapQT2iT8Q9KtQJbUtrOCk9Qaxym5Pk0xgo9iCLyhl1Ma7I9ifUcNO6stueiv3GtBuQoOBt/B1fA4jkr+BrlJjx5LBjSGw7HWMFBGRWKLYq2EoROeVFB1tIdAIQR01cxQm4kOKYU4wafPjtXOO8HUc+8OYrPeM2Q89HS26hvbS+lQTkHn9K0xtzwU+HyagxzpxVaBEMNpSC8pzJyVKOTVqrU8lb4ZHlSx40/nTCmwQIU5pU/OhgN0pHelypVKAjTmlSoIFT9KYGnoAQO1NS2p6kBdKVKlQQPtTU4FI7UARPrTJG5JOdqljNIYFAGAFZFJJyafG+TTbg90UDEsYNSzjrUDmpedAEtscqWKYGn6UASx4UhtTDPWnoAkf/AAUuXjUSsgjqPCppUPu7igBDyNP1pyN9hSxQAwqXL0qI605oAR5cqQyBTgbc6bbHQedADZwNzUSSetTxt8JJqCsjxweVAEhXKZK9mb2QXHDslsbZ/gK5y5zMMN9srBcVpT5mqb7hWrtFLB8Kz3WqPCLa63LklIL7kR1bh1OAA4Gw2O+KeI327TagQsKUBsa4iX2S06dwe76VxMlbcpcIkR5Dv6hbfwrIGd/A1hcsvk2Rh8BO02ChYUAdWyvOhSTKTw/LbVJUUxHllIcTuEHwNdbLxMpcgw54KXgSlQxgpIrZcTFvEEhOhxKuaVDr/GpzlER9L9S4Mb2txcVxKpZcV2na6gc62+Y0gVt22Q3dISSB3XBnSob+hoQtrbkWW7HjNrK2daVvPZ3B6Y6/7VrWl9LEdD7QWt9YHaoK9hgdPCkhJ55NF0I7fSa8WOGkkhStTasHWrfHStFp3AGVD5Gq8Z5uShLyRkLGFY33867MthLpSEp7pyDir4dzDLsWTzwKenUnfI60gK3GUjSxUjtSGKcBcxSp8UsUAMRTYqVMaAGpjT9KagBhyp87UhSzQAqVI0qCGPTioinoIF1p6iOVSBoAjSFOaagAfSr8X1qe3Q1A91QB60uRIoGOnpTKOKZNS06geWennQAkn/w1MDfnXIgjrTpWcbjFAHbT50sYFMldSChvmgBsUiNsinzmnORyoAZJNSJ6Gm9N/OlrwKAJYwcg0s555pwQRzzSURigBkjG4605pgoHlsKRODvtQBzUcf8A9pFQz4jpmnUcfEM48qpypTbGdJBPhSykorLJinJ4RV4haQ5b2HCobPpIJPKhu6yJjD4KVrLB+5RDbZDrzLrKmMqOVIQ8g6SeeP4VK5RRcoTc6IjS4kYcQB4c9q5Nry8o6Na2rkC13N1l/snHFIbXkB78BxkfOtAS1OR4z+tASX0l1XQK6Kz0B/32qvcYzZkvNOY0OAHbmD0P1q/aIb70RbTYCloISp4ow2jfPdH3j1qnlvB0q5QUC5xDEXIjs3mEgCWyNTiMYLiPxYqpw/fkqcUG8oJ7xQTt8qL4dtaZjKxlbyk95xZyVf8AnhXn/EEMQbgl6Ons0OHCkfhV/CrWmuTBmMm0g4StMtSZSWkh1sEa84JH76z2XIDodfcDyChXeUn7vmQOlZ1nu3s7RDjgQk7HWMgVVtk0TOMWo1scQtB1GSpGdISOePGmXLRChLDfsg5tcNTDepDiShXeSSfirSZQtS16kAY5K1c6UKWwohGEpI2SKv6UnpW+NSic+VjZXLSugFRUkjntVrSKRTmrCsp0q6PABWBXOnQDg1LNQFSqQEaY8qRpt6AG6UulPTUAKlmlSoAVMaelQAs5FKkKVBAqcU1PQQMacYpU1CAwUujkRkVJQChsdvOqwI+fjXRCyNjQMLJScdKfWodakoA1DG2DQB0C0rA6nxp9sZFcs6fh38qkhwk4WkpxQBPHWuidxsKiKcZ2IoAlUgDUc+POnBxQA3L1plAkbbeorpkHmM/OmJSAcCgCCVbYpyvPjUCrJqKlY2zQB136bio9p03B8K5lZSnlmq77pKcDGo/CnO5+lVTtUSyuqUytKuzS9bUVRWpJwooOcVgXEqVBcW0tQUdldpsQN6JX/ZobICghpKt9SRuT4YG5rKm2Zy64ZdjylRtQUTlKArwznc+mKxS3Wcm2vZDhs5cAwZEhh51yU4tn4UqCySo/iB8PCieHZVRVlxM+QpZOpROMK9RVAWaa3bvY7cW46TtkAgn1wKsWuyXSNoU5JBUjn8W/1pVTL4GtvU22nhGFe+HpJkS5xWVFS8px0HpWjw4vXbFoJwtKt/DnRH+n0n2lgBP4knP5VhQojVvnr7IgxZCToOfhUPumk8JweSHf4iw+5soylCc0OcYw2no4dWP0ZOFKH3D0NbL8+K2N3U4HnWNcLtFWytKH0EgZ055+VNLkWLw8nkV8uEhbi4zrgKUbAp21Dz8aOPsft3ZWybeF/rH19i0T+FPP86GeLFQrm4mNDAXNKsJS22c7nkcV6zYrai12aDbm8YYbAUfxK6/nV2mh6ss06vUxlQoR4Z1JV2oCCQR1FEUdxYZQFHJxzrJYiFKw44oafStRp5GQBua2s4xaSsnmKnmq65UdpSUuPtoJ5BShvXR55DTRcWoJQBkkmkA5Pka651gscURne8+ns15IWlKgrT4cq04lyiS9IZfSSrYA7GrEmgLYG9SpuRwdqejIDGlTmmzUgNilT9KbpQAqanphQAqVPgUsUAKlSNNQQPSpqegBCn6VEU5oRAM/+CkFeNIafE0523AyKgYmlQ61PArjkVIK2oAmABzqJPWpDfkaWnNSAgsCuiVDnmuOnSfCp7c6AOmetIK+lcyaQIzg86AOoVg5ptY8BXIqwd6pXGeiGCMHXo1DI2pJTjHuNGLl2L6nB6eYrklYUtYcVsnl5+tVlNFQaeSs95IKgTsCaGL3xILf2qnXUhY7rbII2A6q/hWSd7f2mqulJZYQypQCVrdLbMRKdSnluYyPIDpQLd/tCgQX0wrAwlTqzhUhae6n5Hc/OgXiXiuZdVlK5C3QDt0Sn0Arhwhal3S8RwQohTuDjfkCSf8AaiulyeZDSt2rCPVrTxFLj9rhGSy2VKkL3KlHkB4fKtW2Xe9TFBbkpCULUkI0ox60OXNTEJtxLoUiM0nx3Wo0/DHFJEn2eWlAZJHZYH6s/vFbGtvCKsblnAWNT7gZxh3Ge4gnUhLrawDg/DkeIrVtNxeUtcKW+tx9G2ondQoV4kS1JdbuLaH0K1dk4CnAOORFbFteEpDL5wJbQABP301QlPdhjNQ2ZRenl2AoutPLLbmRp1daBvtJfuXs0YwZjjKy4QvQdyNI/fmjKa64HW2lt93JIJ8xQ3fLrb4U5KbiyFhxBW2SM4I8q1RgmuTHbPHKPNYcHii6SktMyZDoz3lrwEJHiTRpavs9QlQdvl3cl45MRiUp+av4VdsfEUS7ynGfYnWW2xlBWrZXyFERWwpONCdPqRTx0yfKQnjNcZKkFJtqizaokGK0NglPP5nma5XPjGLbXktzJjaHh/Vt7n6VYQzCbXrSwwFeJ3qIi24LU4iLF7QnKldmnJNTPTSawuCY2pPLJW/jSJNkIbcXI0HmtLeyaM48VXZoejvJebUNQKutY1sUwGylAQDjkkAV2bmIghYUpTLSjqUtv08OnyqiWnuguHkbxYS/ACcU2bipEl2Wm2pebW4V6GV6i3vWGeKbogNxLmJUdvOgKeRgAHpmi+7cdPQ7hHjymnGLZLCkiehzXoUfh3HTxrZg3KxXaGmJOmRJRzgpeIOvzyayO6yDW+GGXbqnHLaA2336JbG0C5wI01gnCH47oDo9d963ZN9sxtyJVsRILpUAGysAp9R4VG9cFWhcFXsduhNysqU0WFY1Dp9eXlWE3YityzrtCElKnexlazkIztn8iK21XQurk13RX6I2wi+zNyPxLJaf1RHQyhQH6BZKgNvOi/h69u3Mlt6GtpSRkuD4DVa28HRIzqH5jqpC08kEYR9OtEaUpQnSgADwFDmpRXBZaq1J7R6VLpTUmSocUq5LfYQe+82k+ahUkOtOJy24lQ8jmhTj2G2y+B8UsU/zpDenFEBtTGn5Ux50AKmNSNNmggWM0qcGltQBEU9KmFCIBkgjO3KlnbOKYHJ3qW6sdaBiJOSMGlv4/On2A31ADwpAjmFH/MKAJg5GOVTBIqCVZ5Y2pwrO1QBMqz0+tJJ3/dUM0s1IE1DnjnTa8bGlqyMGuLzgQCVbJHPyFR2Az+JkSnYAXBuPsTjRKyrAwrbkaHLfepN0LbMpTboZSVqeCMelEEWZHuZcbWgdlnCTnmPE0MXqfbrMt9qGlBfUNOlrGMef1rBdPfLg20x2rk68S8RGJGcYYd7IYxqUrGr0xXkF4ujs59ZOyM8h97zNat/nPytTj68noBsBQu4dzT1QCyWEdYcV+dIRHitLddUe6lAJP5V7hwjYEWCytkpKpZRlRxunJ3xXk3B4usS6tXC2sFRazlSyUIII8a9MY4glKTruU+K2s80sEnHzJrp6fTTnykc+y+MPcqcS26Vcmi6HCXk8kY6enjWVarfMLXYhhAUDnU6rs8ityRxFD6zVnH4f5VmqvNoS4pwtreWrmVJz/vW7+HyfcqWvUVhBnb1djEcFxuLS2XhhbLhB0nooEda6sRFvNp7KchKEnurSd6ChxdEZThiER8gK5L42dyezij5qNP5Be7K/OP2R61GmR1sBm4ONuafv4/P1oP40tFuvTiFR1uocZBShSxsc+BBoQXxxPKdKWGkj51wVxncidksj/LUrQwzyyt6ix9kbUCwrtiENsuLXnK1O6s4ONk6TjPrXNhF1ZZUl0OvOazglXIVjHjC5n+xH+SoHi25nm40P8n86tWnrSxuK1ZZnO005KL6pWplru/h1VzaVxIltaUsDWeWV4rOPFVzz+ubH+UU3/FVzx/7hr6ChUUr3/uM7bX7GtC/4vbcCmRHR4hTp3/Kt5TvE8qEWH2YQWofGl8/woMHFlzTzlNj5Cpji66A7TEflU+DX7MVztfsF1ot8pu1uwbxGad7yi0pK9SQD0IrHk8GOSZixGdERn7pSkqHnmsscX3X/AOW38wK6p4zuqRnt2T56R/GiVMJRw3kqxPOcE2uHLlAntGW9MkxUL74jlXeR1xvt0oqZurqkKDNuVbY6zpaQ0g5TjqT0JoXRxtcT8XYL8tP86stcbTU7llj5Z/jVC0VajJQ7s1V6mUZwc45UecBhbOLp0ABqSpTiRyU4K3VceRAwlfZjfn3689a47exhyE0sf4t/967o4wt7wKXrU13ueEJ3rl/wjURWIzydyfVtDa906Wv2Cp7jpcpSkRVNxwDjUrkfQmqRucxwkOylrKuffNYgc4cuyQ0lswnTuFDZJPn0rjKcVBe7CQvKgO4UnZSfEGuZrNNqdPzZ2+TudNt0Gr9NCw/h9zYkuLKSUI1q/EpQApQpT8PS62VAH4kg7CsIXdbbiRoGjOD51vr7MRh2awo/FgdPKsCnuecnUtp8NbZLhhpw7eHJp7B46iBlKjzNb3I0FcFrQu4KGoYS33fPNG24NdbTScoZZ5HqNUa72orAs0iKVKtJgEabG1KnoIGFKnpqAFSFKnqSAUyOhA9acqyc758qQ7wxTKR3eX51AxIrA3xzpiUqAPdpug6fKmAztj6UATSkFQxnbzpLSAeVQGUny8K6ZBGOVADhWRin6VDPhgUxXgbj6UAT142yMVTmsqksONocLZ2OeeRXVa042NckPEu6dt0kUsllYJXHIIXJ9cZpLUM6EJJ1YPP1rAlxUuKXJcxyGomiDiCI+WFrjNHWk51adlDrQw6h9wNsvPpW2pWVLRyx61i8Fp4NynujkzTZ37q6pxxKmYidweq/Tyq+m12uJEfWYrZLTZUO0GSo0eWq3GQyB39OMbJ2IHSsD7QrKqBFVIZ0pZJSkjqc10tPVyuDBdfHlN8gN2rq0gFZCeiRsB8qo3CcqIsIxlRGd/CrqRmsO959vI/ClI/Ku1rbHTT6ODnUpTnyJV1ePJKRXM3GQeRA9BXFCHJCkpbbKlHYBKc5q7AtEqW6thCQHAhSwlW2rHQedcd6i5/7jcqofBVM6Sf6wikJMgjd1X1qTcNa8HGE+OK6SY3ZIGDv+RpfEn7yG2RXsVVPun+sWfnSPakbqV9a6RWEuFXaZTgbV0dIScHmfCqpyn3yNFRZVyr8R+tS3xsT570df/i+9f8ACqr0Elb5CXEQ0Jyvsz94+eOgoHU240rS82tB8FDG9TFsMI5c6dClNryOY8a7dmFYKTv086jggYKcgVPOSMFkuJlhCCNBB3CRz86IYtqhKiJXFb7ZzHe1bn5ChZslsBSdjViPMmRlpWy4rnnyq6Ofcjg7XKEyhRLAKT1QelTkQy1GZCkkKWnIz1rYYkwb+gMSVCLceTbp+FZ8DRrxDwwj3BCdbAURHTnAzhQG9So/BJ486Cg9flUAtY5LV9av3OOph0hXjXBhoLSr8Q5Vnm2uScZOPbPD+sX+0atQJ77LwysqSTghRrky12i1E9OdQUgJypO+k0V2yUlhiuCaDJiQkgDkfGie3vtSoLSJA1EL0jx3oOhHU02oHmkGibh+DJuxVBhaRIUpK0ajjlzrv62tX6SSfwZtBf5fWQnnHJYmwQ0rThRbP1Fd23nf0RaPfIwrJ2260YtcF3REBbkuRHWsNj9GhJJOPPNDMKzyFTO64lpIOMkZGDXg56Wdfq9mfR6epUahNN8oIeDELF3WpDgLSWcaccjXobTgUkeNBFgtTtrfWZDoWXNklIxnzoutqiY+DvhWM10NJ6Y4Z5rqzjZZvi+C5UTT0q25OMKlmm+VP61ICpUqRzQQNT5ps0qkATZ06cAnHlXQ5xtn51xQkgYKs11BAG5+VKMP3jtuR9KirntTFZPdTsailZOUrQUnlz/OpAluKfI8cGuYBH8afPnUgSztzzXNRz1NMVY6Y+dc1KNKBF1QFJ+K+3bjPI0oT0PMjx9K7RYjz60rQltxOPhKsH6Vs3KFJlWqTFEfCnWyEZXsNv41BJi8MwfeUIuKKw0p1RJKuueQFazXCVlaeKxBZKjzKsnJrJ4Tlot8YWye+0iWwtR0BwHIJrtduJmY74QHkDunO/Knisma2c08BGY8dpAyEoQn5AV5v9r7kdqxxGIpz2ksFRO5OEq/lV5ji7vuZcChjOU7kDyoE44uj1zfjdqpRQCpac/TetWmjm2JS/tbYMNp2xWc1b3LrxIqOhJUnWNWPAVrNp3HmaMfs4sQTIk3SQjcukp/MCuh1P7YojSfc2GvDXD8CK0xGEZvTHTlatPM9KCOP+DZNjuzd+tKVezKcC30I+4c8/SvW4bHYsBCvjV3l+vhQh9ql4VBsBt8YAyZ4LSR+FP3lfSuMzoLuAUy2wlO9oGwWXx2uEHGSedDsm0hbq246VqJOEtnmf40YcG21uXb50aS44h2KlCm06eh2zvRBH4TZZMW5wpSUzGXQ4e13bdT6cwaXOUMzzC48KXm0W1E+bBPsqiQo/eb321jpmn4VsR4g4kt8dtsJjKdBd9E7kflX0Il1qTHWh0tknc4Gx+tCfDtuZt3F7LaYiWlLbccQUbgjrSKPJVtaPQpMZZWhyMrQUgJ055CgD7ROEWZ0NV2bjpJSf8Am2kpx2gx8fqK9FLoS82rOApOPnToSh1DjK8KSsEEeINPnAZPlSfYzGcU5FBeaTuoY3R5Hx+VZ6+wAySU4GBXrfGPDL9suy+52kMtksaRyH+Lrt415vdLbo7QNg6cfDzyfLyq1Y7k5McMFa04R3VHcVbLbaV9m4dCUjvaRufIVbLjUplbr36GS0kqGeeegH4h/tXWHblSo5c5vLAV61oytvAmHkzUxdA1BBwN8kUbcBcU/pfc1yUTFkd1pxRyELPL5Gh+2THYFyYk4BEdxKsLHdUQeR+VE/GMKw3BIu3DhLL7yAp+KEEIJPVJ5BQzyFZ3LDLMGRxrY3YzjupA7qzpx4ZoV9m9m3I2I516Aq9ouvDjiZycTYhQkq/tEZAB9fGgq6E+3AqGG1HJSD+VLe1jKGRlx21lLqW0lSysJAHOpLYciIktyU6V6QnHgedWorqrZcQ4gJ+8pBWORxXS/IDjrZQ6F5Gs6BnJPjWeGNrkHsWbSrXDa8RtRhwTMEHiGK8s4QFd4+VBfD5Ps6gQRpVsDRDb+7LZV/jFep02LdOl8o49z22NnvrvEdvaRlLvaA9QMD86E1PxjcHy2g9m4CpCeWPL/eqPC8ZT8Nb8l9ltlCynWo94fKrsyTanVdjDL0h/OAsJJH0rk26WuMZV92dDT6icZxn7HSDPUrKX1J1IOGwFZOPOi+1JKISNYOVd7ehfg3h/sFrkScrTrOlKk4OaMVqCEk4xzxXHoqks7js9Qvqk9tXKPLeJvtNm2viSZa24R7OO5oStO5V8jRrwXfXuILQZkhktKDpbAPUADelJ4Vs11mmVPt0dx5ZGpenBOPStqHbYtuZEaEyhlkHIQgYFdGdtTqUFHn5OVhnXOKVMpOk7mq1seVIjdss5C3Faf+nJxVOPcjPOCzmpVA1MEY2oGFtSxTcqeggEdQHSnO6e7v5Vyzg+PnXTVkYqBhJPlvUVK1YOcEUgUgnPhUFq6j86AJatudRKqgpR5Zx607ekOIU4o9gdgfvK8dqMgRWvBritwDmofOktQddWlvWhOe7nmRWZoljtOxlJkadwl5IB9MioJzg24TrpKW0uKQnGRpHOsW/cayXHpEOJMU2wwrsy6gbrx1z65prdxAy3IVGuTD0VZSUhxHfSPT0oJuVlVBnuNW6cqbFeGtL2ORzuDjrS2xklnBp0cqpT9QO3GJNdu3aR1uuSJC/iQokqJ86PIPAYciNIuFyktzjklOkKHoD40/AFllQHvbJcFftD50tEjOkb8vWj5xydDVqegENnkpSd01Wkx9RKG7CQMTPs7i+5eytktxi4p7wkqV8R8FDligS/WWbZZMdi4zEyZC2Q4Sgd1O52z1r6DtUCLpLpaKlrAzrGdiK8R46WpfEc9kpAEV0soxy08x/+1dLpuXejl6rCgweio1vNo6qWB+de58P2tESJHYCcpbGpf+I14TqLZ1pOFJ3B8MUdx/tRRHRCt8CI/OlrShBKB8ayBnFbupywooo0i7s9WXhCFrUQBzJryX3iq48cPXS4wn3LYzhmL3fiwd1Add6Kn+JlTVe6EPNpuTidKtHeQ0rnpz1PjV2Gh+2WkszEI9tdGCoAHu+tciSw8PudDa44b9zlcHI0txbkNxtCltkZwMnA2yPWhG1XG62+UqLJeVISskkBPweh8KxLs5MbvpfaWMAqbabUcDlV+yyn3mDJmhRU18ehOSpXRI8ahxJi+MBNKuXsMUyXHDq2whPMetZ/D/GMVd/iCcgNHWUBWcpwoY5+tcUWGeiG9eeIltwoyjlEQncjpkePlWfw5YIdwD11nRA3CWsIhIcOMJH3vM560jfODR4UXVvPbFsBbIBOoA5G/KpR0aDnnis61Sx7O3vqTpwTnPKtdnSUq07g1LfBixyNJisykYdQlWxAJGcZGDXiF/sUVu7SIrCV9s2opCCndKc7Yr3RHIjwrPutojzh2mhCZAGA6U7+h8qiEsEnzde+GJEJYVLdAaUf0Xcz9aa2tyQexR3uzAGtAyDnkBXq8xuV2rzE+OxpQSFZ3HqM0OyLC5wqhDjEntJWhTriyjKGsnCQkfi35nwq9SwRjLwgJv8AZp8QNvXQLjoV1A3+njVWFMW08tIILDaMgqBAV5EV0ut5nXSSqQ9IcebUrsx2gySr91RkW1dvitTA5rcUdLqFDIwfLwqXLjlDKDi8MqvS8R1uBxOnVnss7pNRldojsVvJLTbwAcUU6lIT5edTg2dc6St1kYQydWDyz8663hA92JK1uKdU7lI1dPTwrPq9RCclGKGjXKWUjEeclrkKiJJd30thCM59KOLf9n0yLHhz58hTgKxriFBQfHBJOKzbFJhxnUTIslr2pCNbynm8aT+HbpXrlikr4jZc95R2gzoCn3UK/Rqxy59fSorUSqblF8dgA4utog3ZtaYhih+KhRQN0hQJGB8sbVjodDCg4rkk5NEvG8q43i4sSmLdNRZo8YpaeW0dKlZ3PpyxQTNWt1SY7Q1LdISgeJPKvQaO1R02fgwXVuVgf/ZxJtF4lym7u4lKWgpaNTmlJGTz+WKOhx1wJZgW49xiJUNiI6dRP0rwbi9i3wHH7ZAQULhtNIeWFfrHfvk/XHyoXjY7dsE4GoZNcO7UO57jfXWoLB9YcOcR26/y5qrYXOzb0lXaJ05J8PpWpLURpzyNeffZiym3W6Q8sj/milTSs/EkCiO/znWJMFpDymi4kqztv9aKYOyW0a6Srhk225AQoZOPOrinytIU0oKUOnSgXh+9zLi6UuezoQHFIS4SQVYPhRa3MYSlCvaknBOcdcVbdR4fDKKr/E+1HF4zgJCn3GEIWNKMAjT0/hViCkx47Mc6DpSAAmsy43SK4uOyV5y4Cr0G+PritCFIbfewhaSUpyQCM/OqMpJcmlptt4L1MnY0+2KamQhImmpUqAAsneugO1ciacKqBjolelXLfxpnO9vmuJVq5ahiusVtcpxLTYys+O2KAODh0jPPauTKUPqTkkFP3TRCnh9xaR2zyPknNP8A8NNZ3kOfJIFQBhFGUK0q+HkfHNZ8htSNy0pBPNWNiKL/AHCEABLyikdDUn4y0p0qbQR4CjGScgc12L9tLDxSC4SUqBwU45b9KKI/DdruUVp51lPaaUkPNHCv2huapXBtKGlZYGB4IzQXM4ym2YNssRyFsuHSQopCk88EUObisZHjR4vbuerx4EVC/ZuySkFPdUlRyfn412nPptMJx91anGUJ31bkVixbwzJZhXOM4kodRkoz8JxuPrWrCnt3duSw+lvQU40ZzkHnSCtNPktx1dslC0H9G61nIPL0rwnjdlTfFl4SrJBkZBPMjSmvcETrfbmmor0xhpTaAkJccAOANudeMfaQ60viqYtl1DjbgQoKSoEfDj91dHpf+v8AyMurT8MDpHwLxgd00S8D2H2OR7QHmUyn2ilgvZSc43Snr6nwrFtbHtc06kakNJKsE4Cj0Boxt0q3z4iHnoSW347hUlBcUUHlk5+XI/KtPU7UmkuX7C6OMYwc7PtNO025i1yYUy4RGYslKlh9EVGc79048TRHxvdmLfbHZUnZlCB6k9BWfbHmyv26S2saElaEOADtFHr6ctjyNeZfaPxJJu0v3e2tRYaVrdSvor8NYa6Gvyy52OcnOfd/+4LCbiuc4pMSKVhxwrRrHeAPX1x0rrAvtw4alpfUx2kZ1zSUkbZ8N/3VmcK3eeW1IS2wFIR2aShHeWOeSat6PfUWTGmTlpuKHwthjGQvbACR65ovW1di7T7XLMnwFl9ak8VXC3KlqUlpTCSWwohPaaiMAelHPENvQxY/ZYaEBTbWhB0jueYrL4Vsa2noiZXarfa/SrWrcAY5D5n8q3r0JDjxYwpTLiFaVAfq8Dx65rnxbTybdVJWJVxfCPMbZxa/ZLpFjzmHRbnUhsqwe4rxP769Pg3RtCA5rBaIyFA5BFAtmixplqfi3WMh4xZC06infB3BzW5bkxrfGSzHQ4WOiSrOgeVWxyzJNR9g3jSWpTTb7CwttYyFJ5GpF9Bc7MnBzjesnh9huOHfZ3Fdi4vWGyNkE88V2fff9vUyhKeyCd1HOrV5eVGCvBQ4mtwWl2U2lbitI1oSMnHkKHJBcWlbkpnSdKVqyM5VyTj0FEvEFxmwJEVLTSOwdVoUvVg6sbfKhy+y06AqSs9gjd0pSe+rwSKepNvnsTFerJhwuGI7YckptqzFkyEhwYBS3z7wH3R51k8V2pvSURG0hAHMcqL7fc7gmcFLkoiRSyVpjHGQNsFWemPnXO4S7Rc8pLrKFlJSosqGkL6HTjOKacm2xuW8nlVrDLMxxuSXWWGU6lvNKCVBZGAB9RRNaOB0cQzAffCQw3hSgpBLiiR4HalbbPBj3J+NLcblOoxKWjV3XCTpQnzHM4oz4ffblXGYk6C7DKWw6DpSSRuNseVc/WXrTUueMjQhvl3BqV9nkbh29tFp/wBojTG1NrDuNj4bdDRXwzZYvDsbsmlSewKiXS66VAKxyPliqHGFqv8AJbDkF5vAJPdQVEHp40FGXf4Uh1xxyQzNWn/moz5JQ+n8QB29cVn0etVnqlwbJ6ZSgtjy13PX4/EdlyWG32VowdkAFJ8j+dV27Fw12/tsK1w0OO/pjJLaco8wOhrwu7yF9gC1qaUpWpWhZAJ8vCrDdyudutrDDM6Uh5wdool1RITyA5105ZktqfcxSgovkzOKeHJTN6nmG77c06VrLiUFJO+dwaEEnSoHY4IOKO79d7o5b40Z2fJW5IUSf0pyUgeVB4hqB3SQPSokkuBYrdye5O3JlFht64OhtMh6MhsLHQkBQHrvRfxVaHnpsORFb1pYZ0dkFYPkd6xPszt1sncFxHXgt92MNKt+RSrIo6ugUsIS1ga0kEnmB5VZXa4SUoiWRUlhnnvCVvvFuKo0+zOutLUtQWCDp1HfrRhItrMptMJ2IhqIe8tJOFK8OVbEZPYsNMqV2hQgZWeaqpTNTcpTgUSFJGM+VWXah3PLWCmqjw+zM9fBnDiu8q1R9R6gHIqdg4di2F2WqI44tD5TpQ5voxnbNX2ZGdlV3J22rOoLuaXN9skyKanHKmNWiDinpqaggCz6YpiNvEU5T6DwqBKkkb7elQWYGJ6+FbdtdtPaIQh/s5Kk4AXsT6ViK8uXWs65xzJY/R911G7agcEGoIwH7zy4enWsZUdKEjmo+AqKp6V6Uvh1opUFd3bPka8zgxHOKm1Ny72Y82N3WUOuHfxrStXEJsERVvvokzlIWT27S0uhA6AHOfrUbhnA9ETIQ5u2sfOuobUvGrBrCstxs940u2yehf8A9ZOFD1B3omR3EYJ5Cjd8CYaKT8UaCQkZ8hQ9ebWlbK9I0rUO6rAOPrRHJulvjJJkTGGwOepY2rFnX+zSEFDU1DpI7pQCQfQ1CaZPMTzS5S3GXCxGJyn4l9PX0rBmy5UOaB7Y6MDUXGlkYFbXEs5DLn/KbFQOo42xWNHssp5tEpxv/l1jIWpfxeVZrLXB5lwjfpNK5+uzt7L3YRcP8Yv224NQp8qPOYkp/RvrRqUyo8tR6iuXHNvfuclq4MtMhav0MhbGdAI5HffkaoTWbT7IwEQ3e0UwgHCgSgpJ6+P++1HLiWmeFUl5GpbiNkHbKiOdbdBY01Yu5h1aUsxwecFfu2GYkfBC/wBYojf61ytc12E4VIbQUL7q2yMhQ9K1IzUVS3BJSTtgKJ2B86zri4mKy88gZSk4aSepNdCUd8s+5kUklyXL3xOtMIiOrEhScdiRsg9D6CgRROnU4VKcUdS1E7kmrbaAAp5ait5XxrPWqq1pccDaWyD4+Nb4U7Et3colbvfHYscPz1RJSlNg69JwPHetXiK6LE6NItqewWwO4sDfV1OayI7IYnx1LVoGTlWOVWRqvNwagWxtT8l5elO2NXifIVzNZJQltZuoW+OYhZwp9pnEKHVoddRJQ0MrS8gbDx1CvQbP9qVmnFDNzbXDdVsHD3m9/PpXiPFEqHbmzZLO4lxtCszJSR+vc8B/hH51jR5D7LeA+NJ+4Tk/SuW38GpRT7n0GUNNXC5GO4lTclTak6TkcjvWhEZ7RABGaBPstK5nD63lKJU2+pJ3z3dsV6TawnWkHFXwXBTNpM1oUQJZGFqQRyKTVhK0olELCSAkYVncn0rm4sNMk52rFdvDbCnOzGpTYXqcG6UqRuUq8MjOKhx9xVz2F9oE8RuGJEuO612jSkKQVHbOoD99eQTb897yiNtpUhMUg9m8M6l4yoketc7DxA1fOLbi7dGS7GnOBSEKWUBvT8ON9v4124isJizFLaV2oSsLSM5Xjz8djiqov1PDNbocYLjuXHJi7tHmqMhWe3CRpG69gQPnk1nT7aqM0HWnCS6UhJCSAD6+NcbSt63zFOhvVHd+JtQxy6iti9cRWONanGW47jylEKabOyWlCrHOPyKqLPZFOwT1W28TJTzSn3nmeySE4OlQ5fKjmy2FaeE2GDlU993tXFatOokkkk/OvMOD3HrpdEBYAW66Ep3+pr3TU00sICsJQABqHhSRSs47ldi8IhZYBiF12Y4rJVpQVOk5HifDlVLjJ6Km0ypbjaFIYbLiVqAOPStVpxpQV3kgcie07v0NAP2zXZMayswGVby1hJH+BIyf3Vzuo0+qEY8Nv+3uWaezLyjy1+4JkLQHVjSCNSU+FWJk1D8xTqlBKMJ0J8EdKHl93fqauFpPsDDiMkhWhX7q3wliSJshlPITRvd8txFzmuFuLDy0nCCrUSN9qZNwtMt8NwoC1Njm67gflQ0ibJiBTbDhCCNxjxq9Ym+0bWUY1Z3FNfFxlg5NuoshB4PSuDp64ZcZgsJQkgq0ozg+tGsC9+2OJTKUGnUbYzkEV5RYrlItE9uU3klBwpP4k9RR0HGJ9xQ/byFIdQCcbaSeh86qraT5ZzqtXZu755DhE5nHdXrUhORj1rnLcKglWClJBxms+PCcQkB9ClL5YB2IrjMRNbVpZcGQNWlW+xrW4pdjtJsvNL72NYNaLSFLRnlis+ApoJSqQQhZTnHIn5VpsymFjuuJORtUEkhsAD0pjzp33UJR2mcgc8VFCkqAKTkHkalEZySpiKXWlQACIdDqAUKx61HK0gJKs4qC0577hxjYEcxmnWFJx3txzpS0RcPQ79TVaZNZiNKfkupbaSN1qNJRVjukHfmaCH+JIkh9ZmMNvKQVBtLh7rSs4zjrVkKp2J7e4kpxi1kzeJb4y9IVIjs9kk7g7jtPOqFv4kbUU6j2Tg5A8qs3RTVz7H2qcXi0kpQVJAwCc42rIdtUUfC8mtkdBbtyyl6qGeAshzGX1a1gKUeZScH6iiSJAZkoClvXAp59n7WrQfIivK2GH4q9UeTp8jyomg8R3BEbsO2io2+PSSfpS+QnnsO9VHHcLHoUO3IW5GBjKJz3HCf96HrzxIWVpSZSXpB2SSAMeZPKpM3xK4gYfbgqXjCnygqWv67CqJtlqeQoLeTuc7imr6bZLusET1+1Y3ZX5NJqWbhDbkNgJCjnSQNj/Ck77W89hoqClHOobY8qoxbfHjyWnGLqBoOyTyxRCwqQtafYpUcq56ikEmlt6TKUstZK1rorDy+Dlb7NIXJT27y+zBClkEkAZrSvYuE5gu21579GDpCUAt7HfJ8cCqM+Rd2iXFLS+rsigIHcCFeO3P0NcuArc/NfMSR7U3FY3fSleEuk+I8PGrHppaeO6REdRG5+llSTco7dqakqQ77Q53S2pspyrxzyx6VjqWqYFLe7xxsD09K1eO7s9cL8uFJ1NMwV6WG+WBjn86yu0CW9TRyBzFdTR1rbuZg1c3u2oqqaBbwBsOgrNQ+kSgpxspSlWwI51qqlNNK1LaWtJBygKxv03rcnsW24Qo0djQ0hDYDi9eC4rG5p73PclWgpUVBuYJTG1zkhLGokrw2E81K5AAVsSi1wfb1Wdl5HvyYkCfJTuIqD/VDz8SK0LDY0Qp7bttnjtmsqQDhWnbGwPXzrC4k4ekNyFSY/aP6ySvUcqKuprma/SW2fUS5N2j1NUHsb4Dj7PPs+s8iWoXR56Q4EBSEoUUIWn5b0YcfWO12XgW6G32uO0S1pBQ2CrJIHM715z9nPEzlkcKJsMqdA0tvOLPcHpRbxDxgxeIKorjyezO/ZlOUk+fXbnXNo0GpnHlG7V6yiNn03wXfstsXu3hxhRXrS/l1RxjnnbFF0Vj2Z8oA7vNPpXkjXEkyFoEaepLaNglvYD5Yrch8fv6AXV6sDdRb/AIVvXT7ksHPlq4SeT0K7zG4MB2VI+FpJUE4zk9BXzzeGJ8R+ZM95JeTMWrtkpc06snJBHlXoV64sjXeGI0pwBIVqwlBGfWsEOWlTelwp55+Aml/hdk1y8FlfUoU9lk8+jynUym0rbUlGoAlIxR7b1tzZTrHtYMhxXxLwSgeWefyp+ysZPeUgf5DVmNGtGtPYPoSonoSKSfRX3UjZV19xi00U7zBXawoSyUNrGUkpyFeG5NZE+0vrt3bNtEEpK0gfeT40ay7gI6PZr3D9shJwWntOrT5Efvq7M4r4alWtcMJypbfZgIZPcHT0rO+nOLxgtXV5zjwwS+zOE7IltvstKDsUq7TGCRtttXqb6JSmEuONpWUDvEZC9/EV5paYESA/7RDuymNRyWxpKT65BoohXaQhrRFnJkqRj9GVYJGd/LxpV0y+mTmjLd1Cu6OxmkysOPEuEaEEEoWcHx/89a8n+0i4tzuLDGbP6KE0Gkp54VzV/vXr0u7OwWi5cICgnQVIUtrIO22CCRXlFmbjuz3X7m0wZDjxeLjqM4J3qqvp8tRe7ee2CFeqIJMFkxVvuJShBKlEBKccyelbtj4dn3C6e7WmT2yMqU0s6cKHjRWi22ozhLdfZUrUFbO6RkdRjlRxwb7ClMmG46hUlzL/ALTtqeBPVXiDWieisoWWMtbXa8IwneF7HGdZEi3R1rUkjs0knccyfzoMu1v9zy5E61wHWrY0f0rTiwsDzB6UV8QXdFnuRamR33AsEsrQvUMDl1rIupY4ggttSpgjsDBLCdsnxOOZq+Gjd0WUTvjU8swJd0hOsNvwXErQs4UMd9B8CK9V4Ln5sbA0pCdxpx4V5e1w3aIzhcYnqQvoQgmtuySjaNk3lbjerV2ZZBFcrqP6bv1NajXLDTKatVp67HOMMJns6mpMuNHVHeDWk5WCnOofurMlsiDM1urKS7934selULFxoZjCkIiOSXEDbsU4Jx0I6Vm8T8YRnZIi4dT2YHaJABwvnjPlWrS6O5NUy5a7l9t8VDejbuao7rAUZ6ULTuNKck+VZsS6NN6UhT2Ad8N74+tDCuIYeTht4/IVD/iOP0jufUV1o9OXvkwvWWPsj0QcQQgjuJcxjcKRzqpDu6mnlKP6lRzgdPSgRfEjY5Q3M/8AcqUbibW5pXEI89f8qZaGKWMCPUzbyz1eO83ISXGlakeNdaHOD5RktvqSClA07E53NEdcq2vw5uJ0Kp+JFSPPu02wqoKOB1qOw+9XNSieZNUmsmXE7ZIGK8ovMF6Jd5iOxX2anVrQrTnKSc/vr015W25OPGg3iKfKi3hKWl4S42kgEZGfKtugf1sMz6hejILqDgI/Rq2/wGokq/Ar6Gt/3tOI3x826XvOXpwUoz/2xXoVX8HNcvwD+5+7+VP8Jx4eFECrjKwkhLWP+2Kb3jI/s2cf9um8NkbvwYiXMV0RIxtn862veb39hHI826kLm4Piixj/AKQo2Mhv8GOJA8q7MTC04lbatKk7jBrTNzV1hwj6sim94Nn4rbBP+lU7ZCtJl0cUNusaZbP6T8TZ2NadpvLUe1B5UgRowcKnAg99zO2k+dDxmsY3tcE/6dQVIiLbwbVEwTnASf41l1WlnfBQzhFunlGlt4OXFN3jcQXxyVEzoDQbBI0k4rJZfdbQDgjHdOOtWX4MNx3tG4xa8m1kV1aiQ047Rh5z1eIop09laUV7D2SjN5YzEtIzlAG2NzUg63zJR+0KvIdtqEhJssZeOqiSaftrVn+g4n1NaNtnwUbY/koIlhlxLjbgStJyFBQyK0nOJ0vIxKabUvGNaV6c+tRS9av7iiY8MmpJdtP9wxvrRts+A2QffJQVcGnDlJaSPJVQ9qR+NH7Vafa2nmLDFz61LtrVj+gYvzzU/V+A2w/Jk+0t/jR+0KkieloKCXwkKGFYXzFanb2vpYYn0qapdsyCLBBHTYYqH4vwCjAxjOZP9aj9ql7az/bI/arZ9rt39xw6l7bb8/0HCPyoxb8EYiYZnMj+tb/apvbmhuH2wfWt/wBugdLFBx/00xnQs7WOD+zR9X4JxE4w+MFss9jILMhAGBlWDiq0q/syVHQGWgeiTV8T4Wf6Dg/s1L3jE6WSB80UihZnOAaiY3t7P9o39RXaNdExnkvMPISscu9Wom5RwNrNbx/pmpi6sgHFpt4I/wDq/nTPxX7C4Q0njBmVHSy+3qUPB3uj5VkOzWnVlWtCc9Aa2Rd0JGfdduH+l/Opi9Kx3bfbx/pfzpYwmu0UThGD7QyoYKk/UVowL4YiAyVocZ/AojarpvLvMQ7eP9D+dL31IGMRoI9GB/GncZNYcRcIpzbsxKxpbQnbGSrVgeFUw4j7qtRrb99ywRhmIPRgVL37Oz3UsD0ZFCU0sJIMGLqKuSFn0BNRU6UqCdDmo8hoNb/v25Z+NsejQpC8XNSs9p9Gh/Cj6n4BJFWzXF21syXobM1M51HZA9mdCUdTtuT5VS7OUslRjSSTvktHetpN3u39qr5ND+FOi6Xgp/XO/Jv+VVQplCTkksseU3JJP2MgJnBotCJJKSckdief0qPs08/DBkn/AEzW2LheCnHbSPkn+VL268af10rb1p8WfgXBkJi3IgAwJhxyy3yrs1GnhadVslHf8IH76v8Atl6VycmH5GpJk3dKkl5cpKc/eJFL9T5RG1Ho3BUVUe0hxZwt05UjG6PI0QVj8Kavcza1klS1KOSc9a1685c27ZNnWpSUEeZlQPLl41yWpSeZ2pm3ApGcc6i4ocz9KzGo4uL8aEuM21qcjPtpUdIKSUjlRWsjxqu4QPu5qyux1zUkRKO5YPPWbtPYACJKsDod6vx+IppIC0sL9W6IpTDDuS5HbX6pGazX7fDCtSY6UHy2rpw6ml3RllpEzkOIH/7GP+x/Ope/Xc7xYx/yUM3hx6LNU20dKMZSKpCbKH3/AMq2x18ZLKRQ9LgNU35f/wAKN+xUvf2+8GN+zQSLjJyApafpTGfKzgkZ9KdayD9hfKhuL8k5/wDT430qQvjOnvW1iggT5A6pPyqSbjI/w0ebiR5YNjeopG9sZ+RpzeIOwNsR9f5UFm5SAPhR9KYXZ8HCkI9d6nzkA8sGhu0Db/0xP1H8KmLtbsb2wfUUEm5vavgTTi5vfgT9abzUCPLBsm7WzO9sH7VSFztX92n60Ei6PZ/VpPzpG7O/2SfrUear+SPKsOBdLR1tqvkRS96WfH9Gq+tA5vDgH6kfWpe914GGhg786laqtvGQ8sw2952f+7l/Wn952fH9HK/Kgj3s5/Yj61L3u5/Yj60eYr+Q8uw295WjH9Gq+op/elo/u1X1FA/vVwqGpoEetP73UFD9FsPOjzFfyHlmHPvWz/3YfypG52jO1tP1FAqbypRISyDjzrobuvAwyPmaiOpra7h5Zht71tH92n6il70tGf6NP1FA5uzpP6kfWl72dH9Un603mK/yR5eQci7WnP8ARY+opxd7Xn+ix+VAhuz39kn61BF7e7QJDKMk450r1NS75Dy0mH/vi26SRak/UUk3m3kH/wBKb+v8qCPe8j+zRTe9pHRCPzqfGr/IeWYci8wQP6Ka+Z/lUhfIgT3bUwKBfesn8KPzpve0ocko+lR4tZPgMPPfzIA02xgZqR4hTtpt8YfKvO3b3NRthsj/AKa7NXaatpKj2e/+GlWoqbxgnyzxkPF3/JGIEb9k0w4idB7sSMP8hoG96TfxIx/01E3OYeak/s0/i1/BHgMPv+I5GrAjxx/kP8aQ4klZ/VMfsH+NAHvGb0cH7NcHrrPQCQ7jH+Gld9SWcErTs9HHEcsnZDWM4+CnRxFM5/of2BXnEG5z3lqJeOAPCrYlzT/XHNEL65rKiD07Qep4hnYOC0P9MV0j3uc44MuNAAZPdFArK5SyMvLo04Jtok3eKJKe1QXO8Fb5FPKUFByx2Edazguquj69u3PomukdqdLV3Y0p0k89CsV6k1DhsDDMVlH/AEtgVY5DkPlXLl1L/jAvjpPllKysLj2uO06goWEd5J6Gr2KWaeubJ5bb9zZFbVhHjtnXMXH1SmioZPfyAPkKuLIV1GKpQFktqHgTtVgrHX86qLzkpPPCuVcHQetdVOJyceFVHlkEkE8qgDi/gHOc1RdUCk5BNdnnCeQz61SfXnmPpUZGB7iNsdu04OqSmssIzW3fE6ourqlQNZTY3rp6PEo4M13DOC4+oHaklsq58xsau6KQQK3qldzPvKoZpBmrgbp9FP4RG4qdl41BcfIq9o2pko2rNfOulev3IdmCihokbjcbZroGqt9lk71dt1mm3JakwY6nSn4iCAB9aojrdP2F8VNmR2VN2PlWlJhPRXlMyWlNOJ5pUMGuXZUz1unDxcFBTG1M0yQCD45q+tBSlRHQZqmX1j7qavpnXdzAaNm5C7Hyp+xqPtC/wprSttru9zbW5b7e4+hBwpSAMA/M1e4xXcbkoBrypFjI5VJ1x1pZQ63oWk4UlQwQaj7Qr8IptsSMs5Nxyl0+BFd+xPhTtPKW4kFI3q3p3rHdqdPppbZm3T6HUapbq1win2JqXYVa01ft9muNxQpcGG68hPNScYH1qpdS0j7P+xfLpGrisySX8zG7DxFclxSl9tQG2oVpuNLacU24kpWk4IIwQajSy6jo3w8/0Gj0fWYykv6lYMHPKpdh5VpW2OmVNZZWSErVg4ojTw3E/G6fpVVvXdDU8Sb/AKGe7p2pqeJgWGfKpdhtyoz/AOG4efie+oq1H4PakIKmkvKSOuoUkf1BoZvEU3/IpeltXc83mxiWioDlVpqPhptPgkCjlzheIhSkL7YKHMFVOjhqEAP1p/zVV/8AQ9PjPPP9CfK2tASGD4U/s/lRhc7HDjQXXmw5rQBjK8jOaHi2K7HTtbRr4OdS4XyZroSqeJFD2byrlIiFaDgdK1A2KkGxW90poq8RmXbIfZxhqHeUSSKuoY35VaSjFdUo3poVKKwhZWNvJKHG1OJGK9F4Di/8+lY+6kmgy3tZKa9K4IZ0pfcPgEiqta9lEhK/VYkFZqQyajnenFeZOoSxT4phT70AeMQSkvyE9NQUKsqBHwnI8KzLW5qkaj95I+dajhJFI+5cjg6gascqqOgDIyasOK8Sc1Wdx4Y9KUkpPgdaoukDJzV54b1QfxUDIz5/6SO4nyzWMx0rcd5nIyOVYjY0uKTywcV0NBL1YM964LIG1OBTo5VLFd1IwkQKcCkBT4qcECIGKZIqWKSfirm9WhmlP4ZVZ2JIRlQAGSaJruoQLUxZ7avtSR2sp1rfUTvjIpuDQmO/LuLygGIjBKkkZ1KOwrnAuCXXZbxVHjrdIOjcJJIOcVwFwghxH9yzGLF5tARd3exfjHDD2CVujHw4x8hQu60404UOIUhQO6VDBHrRFPfb92qQzLQvQUFJTsc7dfH+FTlITxFaVz0Y94wkYk//AGtj73rUvkmS3L8gutPcPoaySN62CNqyljDivWur0l/ciKX3O1thKuE9iIhaGy6vT2izhKfM0R8SXVTbzFnsDjqIlvGkKa5uOdVVatMocPcGKmvIbfcnu6GGnRlISPiP+9UOHlwIifaveCGHXB32FJyAMnABrfKW5t44XBsS4NC6tQr/AGdq5vvIavLbZS5Ha7y5B6HT0NBWCMgjBG1Ecp1uzzmbvbZoXJU7rDeAAU7Z+u4rpxbCiyGI/ENrSExZp0utj+qe6j501T2tL2ZElkGmf1qfWtE1ntj9In1rSHnXD66sWQ/Y9T+nXmqf7lq0wTcZ7MVLiWy4d1qOAkdTW7f7mtlbNvspdahQ9g4jI7RefiJ9atlxmw8LxY0lpp+VPyrS4AOzb8c888qiy9Gbitx25rKmminQonBVhW4x4Vy4rasZ5NllrsnvccpcL/JK7sxr3aWbk66lFzSjC2Wu8p49CR086DsY586KXrim3y4txjvoU42rCmwnGpKt1ZqtxZb2mnmLlC/9lPT2iMfcV1TSWLKyi3SWbGoPs+34/Bn8PJzeIo/x/uo5CdqCeGx/61H9T/tR0lJOE4yTXC6h96Rl6p/qr9jpEjh94IUsITzUTViY+pxaEMJKGk7NgdfOrEtwRI6IYSlSin9ISOXzpwtodnh1Pd68+nWro1quLrUsP3/wcRyy8sjOQiRFS8SfaAnvIQM/M1ngDIxvWgqT2M4LOFJKdKwOoqFxjCPKIR+rUNST5GqdZFWJ2R9uH/keDa4MHiM4tbo/EUj86EaLOKDi2gficFCor3X6ShjQN/LZyeov6o2KcDenxTivVGDJMCpoFMmujY3oINa2IyU16bwi3pt61fiV+6vOLWndOK9S4eb02trzya5nVJYqwWaVZsyaWN6ljwpAVIDauCdIYCnpCpZqAPCYjyGw2PhKVFGT5VpuObbacVgp/VLPXta1NauyznekZciSlA56+Brk4MDfOKZROTXJZOOdIMjg9g1Qeq06TVR07UAU3QaxXwUTF55HcVsOc6y53/uEn/DWnSSxaiu1ekmwkpTuc53rtp2zkenWubXwiupr01a4ObLuRxinpVKnwLkbFJIOvanqbXx/KsPUY508iuz7S/arjKti1lhDbiHBhxp0ZSseYrTHEZTsmyWwb/2NYwrVtUVl+HKcdRqW2nunJ22ryqm1wZ4Wz7I6xuIXGGpKRb4ZLzgWkdmClJ9K4S+IZ8mM7HQ1GjtOp0rDDQQVD1rOpqV2sh6ifYr9mrwrOfiu9qvCcjPOtmq7v6w11ujPNzX4LNPJ7sHe0X26W2F7EGI8qMDqS1JbCwg+VWV8TSnEKSqx2kBSSMiOM1xtLLci4xmnk6m1OJCh40fp4etBB/5Frb1rt3xqg+UdCO59gMVxW97HCZFjtzio7XZlTjQUMdMeFZd5vFyuzDcZ1hliK2rWliOgITq8a9EVw9aRnEJvmOp/jQzxfbokBUb2RlLWvOrBO9RUqm1hEy3Y5AxLDoUDoO1XQa6nlXDrXE/UEUnD+Z6b9OP0zX7BGxxU6IzLE6BCnBlOltb6MqA8M1GTxE0+wtpNjtrJVsFoQcisAcqNX2Wv+CUudi3rMVCtWgZzrxnNcKM5y9zr3V1Vtenv+StL4vaecQtFjt6iEAZdRkggch5Vj3i9SbsWg+G22WRhtlpOEJq5wTFYl3otSWkOt9go6VDIztWZeG0M3WW00kJQh5QSkcgM1EpyccssqrqhbhR5Ra4XTrvTAHPvH8jR4G1g5AINA/CH9ONf9Kv9q9CrgdSk1asHL6q/rL9jp7c6r9ZGZWr8Sk7mkZRUpBMRlISrV3U4z5VzFSrP5+/5OTtidXJxKiRDZ3PMp3rhIU9IdK3EnPIADkKkeldfGks1dtqxJ8EpJdgX4tymLHSRjKz/ALUL0VcanuRPVVCwr6j+lo46bB/Of+zi655uYhUwBUamK9EYySdq6pQogBJwTyrmmrDHx0ENm1aY61KbK31nTnVp2Cq9Ys6OytkZBOSEDNeZWgDCfWvUI6EhlvA+6K4vVPZGnR8tssjFSA8KgoDSak3yrjm4cDPXFS0U1KgD/9k=',
    },
    {
      id: 7,
      title: 'Overflowing Street Bin',
      location: 'High Street',
      time: '1 month ago',
      status: 'In Progress',
      statusColor: '#F59E0B',
      type: 'Voice',
      typeIcon: Mic,
      typeColor: '#3B82F6',
      points: 65,
      image: 'https://norcalco.wpenginepowered.com/wp-content/uploads/2020/05/overflowing-garbage.jpg',
    },
    {
      id: 8,
      title: 'Broken Glass Hazard',
      location: 'Beach Front',
      time: '2 months ago',
      status: 'Resolved',
      statusColor: '#10B981',
      type: 'Photo',
      typeIcon: Camera,
      typeColor: '#10B981',
      points: 90,
      image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/k%2FPhoto%2FLifestyle%2F2020-04-4-Easy-Ways-to-Clean-Up-Broken-Glass%2F4-Easy-Ways-to-Clean-Up-Broken-Glass-Tips-from-the-Kitchn661'
    },
  ];

  const filters = [
    { id: 'all', label: 'All', count: allReports.length },
    { id: 'photo', label: 'Photo', count: allReports.filter(r => r.type === 'Photo').length },
    { id: 'voice', label: 'Voice', count: allReports.filter(r => r.type === 'Voice').length },
    { id: 'resolved', label: 'Resolved', count: allReports.filter(r => r.status === 'Resolved').length },
    { id: 'pending', label: 'Pending', count: allReports.filter(r => r.status !== 'Resolved').length },
  ];

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'photo' && report.type === 'Photo') ||
                         (selectedFilter === 'voice' && report.type === 'Voice') ||
                         (selectedFilter === 'resolved' && report.status === 'Resolved') ||
                         (selectedFilter === 'pending' && report.status !== 'Resolved');
    
    return matchesSearch && matchesFilter;
  });

  const handleReportPress = (report: any) => {
    console.log('Report pressed:', report.id);
    // Navigate to report details
  };

  const handleBack = () => {
    router.navigate("../../ReportsScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header currentPoints={1750} />
      
      {/* Custom header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Reports</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reports..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter.id && styles.filterChipTextActive
              ]}>
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>
              {filteredReports.length} report{filteredReports.length !== 1 ? 's' : ''} found
            </Text>
          </View>

          <View style={styles.reportsList}>
            {filteredReports.map((report) => (
              <TouchableOpacity 
                key={report.id} 
                style={styles.reportItem}
                onPress={() => handleReportPress(report)}
              >
                <View style={styles.reportImageContainer}>
                  <Image source={{ uri: report.image }} style={styles.reportImage} />
                  <View style={[styles.typeBadge, { backgroundColor: report.typeColor + '20' }]}>
                    <report.typeIcon size={12} color={report.typeColor} />
                  </View>
                </View>
                
                <View style={styles.reportContent}>
                  <View style={styles.reportHeader}>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <View style={styles.pointsContainer}>
                      <Text style={styles.pointsText}>+{report.points}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.reportMeta}>
                    <View style={styles.metaItem}>
                      <MapPin size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{report.location}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Clock size={14} color="#6B7280" />
                      <Text style={styles.metaText}>{report.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.reportFooter}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: report.statusColor + '20' }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: report.statusColor }
                      ]}>
                        {report.status}
                      </Text>
                    </View>
                    <Text style={styles.reportType}>{report.type}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredReports.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>No reports found</Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 4,
    marginLeft: 16,
  },
  filterChipActive: {
    backgroundColor: '#3B82F6',
  },
  filterChipText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  reportsList: {
    gap: 12,
  },
  reportItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reportImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  reportImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportContent: {
    flex: 1,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  pointsContainer: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  reportMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reportType: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});