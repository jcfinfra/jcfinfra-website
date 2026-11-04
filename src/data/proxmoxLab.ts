export const proxmoxLab = {
  en: {
    title: 'Proxmox VE homelab and Debian 13 recovery',
    summary: 'Repurposing a laptop as a KVM/QEMU host and validating a Debian VM from deployment through backup and recovery.',
    outcome: "The restore output records a completed recovery into VM 101 while VM 100 remained intact. The lab record also documents booting the recovered guest with its network disconnected and signing in through the console.",
    hardware: "I reused an HP ProBook 4540s with an Intel Core i7-3612QM (4 cores, 8 threads), approximately 12 GB RAM and a 480 GB Kingston A400 SSD. Proxmox used an ext4 root filesystem and LVM storage, including the LVM-thin pool for guest disks.",
    diagram: `ThinkPad (Windows) ── home LAN ── HP ProBook (pve01)
                                 ├─ vmbr0 ── VirtIO ── VM 100
                                 ├─ VM 101 · network disconnected
                                 └─ Kingston SSD
                                    └─ local-lvm (VM disks)

pve01 ── SCP via Windows ── external 1 TB BitLocker drive`,
    diagramNote: 'Implemented topology. The external drive was connected to Windows. It held the encrypted host configuration archive and the compressed VM backup.',
    guest: 'VM 100 (debian-lab01) ran Debian 13 with 2 vCPUs, 2 GiB RAM, a 25 GiB virtual disk on local-lvm, a VirtIO NIC, SSH and QEMU Guest Agent. VM 101 (debian-restore-test) was created from its backup.',
    steps: [
      "I verified the Proxmox installation ISO with SHA-256, prepared the bootable USB and installed onto the Kingston SSD. I excluded the HGST drive from trusted storage after the SMART warning.",
      "I bridged guest networking to the home LAN through vmbr0. Proxmox and Ceph Enterprise repositories returned HTTP 401. I disabled those entries, enabled Proxmox No-Subscription for this lab and confirmed that APT could read the package indexes.",
      "Proxmox rejected the first Debian ISO download because SHA-512 was selected with a SHA-256 checksum. I selected SHA-256 with the matching digest and the download passed verification.",
      "I provisioned Debian on local-lvm with VirtIO networking, enabled SSH and QEMU Guest Agent, and configured a systemd-logind drop-in to ignore lid closure.",
      "Before updating Proxmox, I compressed and encrypted the host configuration with OpenSSL AES-256-CBC and PBKDF2. I created a separate Zstandard-compressed VM backup with vzdump in stop mode. I transferred both over SCP and matched the SHA-256 hashes at source and destination. An elevated Windows check confirmed BitLocker protection on the external drive.",
      "After rebooting into the updated kernel, I reconnected to Debian over SSH and checked both guest services and outbound connectivity. I then restored the VM backup into a separate ID on local-lvm."
    ],
    commands: '# Proxmox host\npveversion\nuname -r\nqm list\n\n# Debian guest\nsystemctl status qemu-guest-agent',
    provenance: "The validation combines cropped original screenshots, terminal output recovered from the lab history and observations from the technical closeout. The evidence section identifies what each capture shows.",
    results: [
      [
        "Management and network",
        "I reached the Proxmox interface over HTTPS with a browser trust warning. Debian reached the LAN and Internet, resolved DNS and accepted SSH from Windows. I also checked sudo."
      ],
      [
        "Guest integration",
        "The QEMU Guest Agent service was active in VM 100."
      ],
      [
        "Lid closure",
        "The lab record reports that connectivity persisted with the lid closed. The original ping output shows 10 replies from 10 requests."
      ],
      [
        "Temperature",
        "CPU Package was approximately 47–48 °C at idle. It reached 64 °C in a 60-second stress-ng run with two workers at 50% load each and zero reported failures."
      ],
      [
        "Update and reboot",
        "The node booted with pve-manager 9.2.25 and kernel 7.0.14-26-pve. A recorded SSH session after reboot shows SSH and QEMU Guest Agent active and 3 of 3 replies from an external IP."
      ],
      [
        "Backup integrity",
        "The source and destination SHA-256 hashes matched for both archives. The host archive was individually encrypted. The compressed VM archive was protected at rest on the external BitLocker volume."
      ]
    ],
    limits: [
      'A 500 GB HGST HDD was excluded from trusted storage following SMART issues. The laptop battery was degraded.',
      'Thermal checks were brief and moderate. Fan RPM was unavailable. The anomalous 127 °C ACPI reading was excluded from CPU Package measurements. Continuous and maximum-load behavior remain unmeasured.',
      'A GRUB/UEFI metapackage maintenance observation remained open. The recorded reboot succeeded.',
      'The single-node environment had no high availability. External backup verification and the guest restore covered this exercise. Enterprise retention and full host recovery remain outside its scope.',
    ],
    lesson: 'Checksum verification confirmed transfer integrity. Boot and console login answered the separate operational question of whether the backup could recover a usable Debian guest.',
    recovery: "The recovered terminal output shows the restore reaching 100% and qm list showing both VMs stopped, with separate IDs and 25 GiB boot disks. The excerpt below omits shell prompts and unrelated output.",
    recoveryLimit: "The lab record then documents renaming VM 101, disconnecting its virtual NIC using link_down=1, starting it and signing in from the console. The available console crop shows a Debian login under the inherited hostname, without a visible VM ID. The closeout records that VM 101 and the host were shut down after the test.",
  },
  es: {
    title: 'Homelab Proxmox VE y recuperación de Debian 13',
    summary: 'Reutilización de una laptop como host KVM/QEMU y validación de una VM Debian desde el despliegue hasta el respaldo y la recuperación.',
    outcome: "La salida de restauración registra la recuperación en la VM 101 mientras la VM 100 se conservó intacta. El historial también documenta el arranque de la VM recuperada con la red desconectada y el inicio de sesión por consola.",
    hardware: "Reutilicé una HP ProBook 4540s con un Intel Core i7-3612QM (4 núcleos, 8 hilos), aproximadamente 12 GB de RAM y un SSD Kingston A400 de 480 GB. Proxmox usó ext4 para el sistema raíz y LVM para el almacenamiento, incluido el pool LVM-Thin de discos virtuales.",
    diagram: `ThinkPad (Windows) ── red doméstica ── HP ProBook (pve01)
                                      ├─ vmbr0 ── VirtIO ── VM 100
                                      ├─ VM 101 · red desconectada
                                      └─ SSD Kingston
                                         └─ local-lvm (discos VM)

pve01 ── SCP vía Windows ── disco externo de 1 TB con BitLocker`,
    diagramNote: 'Topología implementada. El disco externo, conectado a Windows, almacenó el archivo cifrado de configuración del host y el respaldo comprimido de la VM.',
    guest: 'La VM 100 (debian-lab01) ejecutó Debian 13 con 2 vCPU, 2 GiB de RAM, un disco virtual de 25 GiB en local-lvm, interfaz VirtIO, SSH y QEMU Guest Agent. La VM 101 (debian-restore-test) se creó a partir de su respaldo.',
    steps: [
      "Verifiqué por SHA-256 la ISO de Proxmox, preparé el USB de arranque e instalé el hipervisor en el SSD Kingston. Excluí el HDD HGST del almacenamiento confiable tras la advertencia SMART.",
      "Conecté la red de la VM a la LAN mediante vmbr0. Los repositorios Enterprise de Proxmox y Ceph devolvieron HTTP 401. Deshabilité esas entradas, activé Proxmox No-Subscription para el laboratorio y comprobé que APT volvía a leer los índices.",
      "Proxmox rechazó la primera descarga de la ISO de Debian porque se había seleccionado SHA-512 con un checksum SHA-256. Seleccioné SHA-256 con el valor correspondiente y la descarga pasó la verificación.",
      "Instalé Debian en local-lvm con red VirtIO, habilité SSH y QEMU Guest Agent, y añadí un archivo de configuración de systemd-logind para ignorar el cierre de tapa.",
      "Antes de actualizar Proxmox, comprimí y cifré la configuración del host con OpenSSL AES-256-CBC y PBKDF2. Generé por separado un respaldo de la VM con vzdump en modo stop y compresión Zstandard. Transferí ambos por SCP y cotejé SHA-256 entre origen y destino. Una consulta elevada de Windows confirmó la protección BitLocker del disco externo.",
      "Tras reiniciar con el kernel actualizado, volví a conectarme por SSH a Debian y comprobé sus servicios y la conectividad externa. Después restauré el respaldo en un ID independiente sobre local-lvm."
    ],
    commands: '# Host Proxmox\npveversion\nuname -r\nqm list\n\n# VM Debian\nsystemctl status qemu-guest-agent',
    provenance: "La validación combina recortes de capturas originales, salidas de terminal recuperadas del historial y observaciones del cierre técnico. La sección de evidencias indica qué muestra cada captura.",
    results: [
      [
        "Administración y red",
        "Accedí a Proxmox por HTTPS con una advertencia de confianza del navegador. Debian alcanzó la LAN e Internet, resolvió DNS y aceptó SSH desde Windows. También comprobé sudo."
      ],
      [
        "Integración con el host",
        "El servicio QEMU Guest Agent estaba activo en la VM 100."
      ],
      [
        "Cierre de tapa",
        "El historial registra que se mantuvo la conectividad con la tapa cerrada. La salida original de ping muestra 10 respuestas a 10 solicitudes."
      ],
      [
        "Temperatura",
        "CPU Package registró aproximadamente 47–48 °C en reposo. Alcanzó 64 °C durante una prueba de 60 segundos con dos workers de stress-ng al 50 % de carga cada uno y cero fallos reportados."
      ],
      [
        "Actualización y reinicio",
        "El nodo arrancó con pve-manager 9.2.25 y kernel 7.0.14-26-pve. Una sesión SSH registrada después del reinicio muestra SSH y QEMU Guest Agent activos y 3 respuestas de 3 pings a una IP externa."
      ],
      [
        "Integridad de los respaldos",
        "Los hashes SHA-256 de origen y destino coincidieron para ambos archivos. El archivo del host se cifró individualmente. El respaldo comprimido de la VM quedó protegido en reposo por el volumen BitLocker externo."
      ]
    ],
    limits: [
      'El HDD HGST de 500 GB quedó fuera del almacenamiento confiable por problemas SMART. La batería de la laptop estaba degradada.',
      'Las pruebas térmicas fueron breves y moderadas. No hubo lectura de RPM del ventilador. La lectura ACPI anómala de 127 °C se excluyó de las mediciones de CPU Package. Quedó sin medir el comportamiento continuo y a carga máxima.',
      'Quedó pendiente una observación de mantenimiento del metapaquete GRUB/UEFI. El reinicio registrado fue satisfactorio.',
      'El entorno de un solo nodo carecía de alta disponibilidad. La verificación de las copias externas y la restauración cubrieron este ejercicio. La retención empresarial y la recuperación integral del host quedaron fuera del alcance.',
    ],
    lesson: 'La comprobación SHA-256 confirmó la integridad de la transferencia. El arranque y el inicio de sesión por consola demostraron que se podía recuperar una VM Debian utilizable.',
    recovery: "La salida de terminal recuperada muestra que la restauración llegó al 100 % y que qm list mostró ambas VMs detenidas, con IDs distintos y discos de arranque de 25 GiB. El extracto omite los prompts y las líneas ajenas a la comprobación.",
    recoveryLimit: "El historial documenta después el cambio de nombre de la VM 101, la desconexión de su NIC virtual con link_down=1, el arranque y el inicio de sesión por consola. El recorte disponible muestra una sesión Debian bajo el hostname heredado, sin el ID de VM visible. El cierre registra que la VM 101 y el host se apagaron después de la prueba.",
  },
};

export const restoreOutput = `progress 99% (read 26575110144 bytes, duration 13 sec)
progress 100% (read 26843545600 bytes, duration 13 sec)
total bytes read 26843545600, sparse bytes 24884215808 (92.7%)
space reduction due to 4K zero blocks 2.91%
rescan volumes...
      VMID NAME                 STATUS     MEM(MB)    BOOTDISK(GB) PID
       100 debian-lab01         stopped    2048              25.00 0
       101 debian-lab01         stopped    2048              25.00 0`;
