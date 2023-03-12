import Solicitud from "../models/solicitudModel.js";

const getFullSolicitudes = async () =>{
    const result = await Solicitud.aggregate(
    [
      {
        $lookup:
        {
          from: 'eventos',
          localField: 'evento',
          foreignField: '_id',
          as: 'solicitudEvento'
        }
      },
      {$unwind: '$solicitudEvento'},
      {
        $lookup:
        {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'solicitudUser'
        }
      },
      {$unwind: '$solicitudUser'}
    ]
  );
  return result;
}

export default getFullSolicitudes;