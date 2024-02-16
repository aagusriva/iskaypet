interface Coordinate {
  lat: string;
  lng: string;
}

interface Address {
  direction: string;
  coordinate: Coordinate;
}

interface Task {
  id: string;
  description: string;
  assigned: boolean;
}

interface Schedule {
  from: string;
  end: string;
  timezone: string;
}

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  address: Address;
  tasks: Task[];
  open: boolean;
  schedule: Schedule;
  shipping_methods: ShippingMethod[];
}
