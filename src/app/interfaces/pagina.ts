export interface Tecnologia {
  id: number;
  tituloTecnologia: string;
  url_foto_tecnologia: string;
}

export interface Pagina {
  id: number;
  titulo_pagina: string;
  descripcion_pagina: string;
  tecnologias: Tecnologia[];
  destacado: boolean;
  fecha: string;
  url_repositorio: string;
  url_pagina: string;
  url_foto: string;
}
