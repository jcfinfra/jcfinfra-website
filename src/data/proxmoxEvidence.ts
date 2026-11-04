export const proxmoxEvidence = [
  {
    "file": "e01-debian-iso.png",
    "width": 647,
    "height": 390,
    "en": "Proxmox reports checksum verified and TASK OK for the Debian 13.7 ISO.",
    "es": "Proxmox muestra checksum verified y TASK OK al descargar la ISO de Debian 13.7."
  },
  {
    "file": "e02-vm100-hardware.png",
    "width": 883,
    "height": 302,
    "en": "VM 100 hardware shows 2 vCPUs, 2 GiB RAM, a 25 GiB disk on local-lvm and VirtIO on vmbr0.",
    "es": "El hardware de la VM 100 muestra 2 vCPU, 2 GiB de RAM, un disco de 25 GiB en local-lvm y VirtIO sobre vmbr0."
  },
  {
    "file": "e03-ssh.png",
    "width": 966,
    "height": 315,
    "en": "The initial SSH session reaches the Debian shell. Connection details are masked.",
    "es": "La primera sesión SSH llega al shell de Debian. Se ocultaron los datos de conexión."
  },
  {
    "file": "e04-guest-agent.png",
    "width": 747,
    "height": 154,
    "en": "The QEMU Guest Agent service in Debian reports active (running).",
    "es": "El servicio QEMU Guest Agent en Debian figura como active (running)."
  },
  {
    "file": "e05-thermal.png",
    "width": 660,
    "height": 620,
    "en": "CPU Package reaches 64 °C during a 60-second stress-ng run with two workers at 50% load each and zero reported failures.",
    "es": "CPU Package alcanza 64 °C en una prueba de 60 segundos con dos workers de stress-ng al 50 % de carga cada uno y cero fallos reportados."
  },
  {
    "file": "e06-host-kernel.png",
    "width": 520,
    "height": 55,
    "en": "The host reports pve-manager 9.2.25 and running kernel 7.0.14-26-pve.",
    "es": "El host muestra pve-manager 9.2.25 y el kernel activo 7.0.14-26-pve."
  },
  {
    "file": "e07-vm-backup.png",
    "width": 445,
    "height": 62,
    "en": "The vzdump log reports successful completion of the VM 100 backup.",
    "es": "El registro de vzdump indica que el respaldo de la VM 100 terminó correctamente."
  },
  {
    "file": "e08-backup-hashes.png",
    "width": 670,
    "height": 260,
    "en": "PowerShell shows SHA-256 results for both copies. The paths and part of each hash are masked.",
    "es": "PowerShell muestra los resultados SHA-256 de ambas copias. Se ocultaron las rutas y parte de cada hash."
  },
  {
    "file": "e09-restore-vm.png",
    "width": 174,
    "height": 159,
    "en": "The Proxmox tree lists VM IDs 100 and 101 on the same node.",
    "es": "El árbol de Proxmox lista las VM 100 y 101 en el mismo nodo."
  }
];
