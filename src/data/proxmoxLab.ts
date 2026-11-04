export const proxmoxLab = {
  en: {
    title: 'Proxmox VE homelab and Debian 13 recovery',
    summary: 'Repurposing a laptop as a KVM/QEMU host and validating a Debian VM from deployment through backup and recovery.',
    outcome: 'The Debian backup booted as a separate VM (101) with its network disconnected. Console login succeeded, and both VMs and the host were shut down cleanly at closeout.',
    hardware: 'A single HP ProBook hosted Proxmox VE 9.2 on an Intel Core i7-3612QM (4 cores, 8 threads), approximately 12 GB RAM and a 480 GB Kingston A400 SSD. The SSD provided LVM and LVM-thin storage.',
    diagram: `ThinkPad (Windows) ── home LAN ── HP ProBook (pve01)
                                 ├─ vmbr0 ── VirtIO ── VM 100
                                 ├─ VM 101 · network disconnected
                                 └─ Kingston SSD
                                    └─ local-lvm (VM disks)

pve01 ── SCP via Windows ── external 1 TB BitLocker drive`,
    diagramNote: 'Implemented topology. The external drive was connected to Windows. It held the encrypted host configuration archive and the compressed VM backup.',
    guest: 'VM 100 (debian-lab01) ran Debian 13 with 2 vCPUs, 2 GiB RAM, a 25 GiB virtual disk on local-lvm, a VirtIO NIC, SSH and QEMU Guest Agent. VM 101 (debian-restore-test) was created from its backup.',
    steps: [
      'Use the Proxmox No-Subscription repositories and bridge the physical LAN through vmbr0 for management and guest connectivity.',
      'Provision Debian 13 on local-lvm and enable SSH and QEMU Guest Agent. Configure systemd-logind to ignore lid closure for this lab host.',
      'Update Proxmox, reboot, check the active kernel and confirm that Debian still runs.',
      'Compress the host configuration and encrypt the archive with OpenSSL AES-256-CBC and PBKDF2. Create a separate Zstandard-compressed VM backup with vzdump. Transfer both over SCP to the external drive and verify SHA-256 checksums.',
      'Restore the VM backup with qmrestore under ID 101. Keep its NIC disconnected to avoid conflicts, then boot and authenticate via the console.',
    ],
    commands: '# Proxmox host\npveversion\nuname -r\nqm list\n\n# Debian guest\nsystemctl status qemu-guest-agent',
    provenance: 'These observations come from the technical closeout and lab record. The results are presented as a written record because the original operational screenshots were unavailable for publication.',
    results: [
      ['Management and network', 'Proxmox HTTPS access and vmbr0 worked. Debian reached the LAN and Internet and resolved DNS. SSH from Windows and sudo were verified.'],
      ['Guest integration', 'QEMU Guest Agent was verified in VM 100.'],
      ['Lid closure', 'Connectivity persisted with the lid closed. The initial 10-ping test recorded 0% packet loss.'],
      ['Temperature', 'CPU Package was approximately 47–48 °C at idle and peaked near 64 °C during brief, moderate 60-second stress-ng tests.'],
      ['Update and reboot', 'The node booted with pve-manager 9.2.25 and kernel 7.0.14-26-pve. Debian operated after the host update.'],
      ['Backup integrity', 'SHA-256 checksums were verified on the external copies. The host archive was individually encrypted. The vzdump archive relied on the BitLocker volume for encryption at rest on the external drive.'],
      ['Recovery', 'The restored Debian VM booted and accepted a console login with networking disconnected. The recovery test covered the guest VM.'],
    ],
    limits: [
      'A 500 GB HGST HDD was excluded from trusted storage following SMART issues. The laptop battery was degraded.',
      'Thermal checks were brief and moderate. Fan RPM was unavailable. The anomalous 127 °C ACPI reading was excluded from CPU Package measurements. Continuous and maximum-load behavior remain unmeasured.',
      'A GRUB/UEFI metapackage maintenance observation remained open. The recorded reboot succeeded.',
      'The single-node environment had no high availability. External backup verification and the guest restore covered this exercise. Enterprise retention and full host recovery remain outside its scope.',
    ],
    lesson: 'Checksum verification confirmed transfer integrity. Boot and console login answered the separate operational question of whether the backup could recover a usable Debian guest.',
  },
  es: {
    title: 'Homelab Proxmox VE y recuperación de Debian 13',
    summary: 'Reutilización de una laptop como host KVM/QEMU y validación de una VM Debian desde el despliegue hasta el respaldo y la recuperación.',
    outcome: 'El respaldo de Debian arrancó como una VM independiente (101) con la red desconectada. El inicio de sesión por consola fue satisfactorio. Ambas VMs y el host se apagaron de forma ordenada al cierre.',
    hardware: 'Una HP ProBook alojó Proxmox VE 9.2 sobre un Intel Core i7-3612QM (4 núcleos, 8 hilos), aproximadamente 12 GB de RAM y un SSD Kingston A400 de 480 GB. El SSD proporcionó almacenamiento LVM y LVM-Thin.',
    diagram: `ThinkPad (Windows) ── red doméstica ── HP ProBook (pve01)
                                      ├─ vmbr0 ── VirtIO ── VM 100
                                      ├─ VM 101 · red desconectada
                                      └─ SSD Kingston
                                         └─ local-lvm (discos VM)

pve01 ── SCP vía Windows ── disco externo de 1 TB con BitLocker`,
    diagramNote: 'Topología implementada. El disco externo, conectado a Windows, almacenó el archivo cifrado de configuración del host y el respaldo comprimido de la VM.',
    guest: 'La VM 100 (debian-lab01) ejecutó Debian 13 con 2 vCPU, 2 GiB de RAM, un disco virtual de 25 GiB en local-lvm, interfaz VirtIO, SSH y QEMU Guest Agent. La VM 101 (debian-restore-test) se creó a partir de su respaldo.',
    steps: [
      'Usar los repositorios No-Subscription de Proxmox y conectar la LAN física a través de vmbr0 para la administración y la conectividad de la VM.',
      'Instalar Debian 13 en local-lvm y habilitar SSH y QEMU Guest Agent. Configurar systemd-logind para que el cierre de tapa no suspenda el host.',
      'Actualizar Proxmox, reiniciar, comprobar el kernel activo y verificar el funcionamiento de Debian tras la actualización.',
      'Comprimir la configuración del host y cifrar el archivo con OpenSSL AES-256-CBC y PBKDF2. Generar por separado un respaldo de la VM con vzdump y compresión Zstandard. Transferir ambos mediante SCP al disco externo y verificar las sumas SHA-256.',
      'Restaurar el respaldo de la VM con qmrestore bajo el ID 101. Mantener su interfaz desconectada para evitar conflictos, arrancar y autenticar por consola.',
    ],
    commands: '# Host Proxmox\npveversion\nuname -r\nqm list\n\n# VM Debian\nsystemctl status qemu-guest-agent',
    provenance: 'Estas observaciones proceden del cierre técnico y del registro del laboratorio. Se presentan como evidencia textual porque las capturas operativas originales no estuvieron disponibles para la publicación.',
    results: [
      ['Administración y red', 'Se validaron HTTPS en Proxmox, el bridge vmbr0 y el acceso de Debian a la LAN e Internet con resolución DNS. También se verificaron SSH desde Windows y sudo.'],
      ['Integración con el host', 'Se verificó QEMU Guest Agent en la VM 100.'],
      ['Cierre de tapa', 'La conectividad se mantuvo con la tapa cerrada. La prueba inicial de 10 pings registró 0 % de pérdida.'],
      ['Temperatura', 'CPU Package registró aproximadamente 47–48 °C en reposo y un máximo cercano a 64 °C en pruebas breves de carga moderada de 60 segundos con stress-ng.'],
      ['Actualización y reinicio', 'El nodo arrancó con pve-manager 9.2.25 y kernel 7.0.14-26-pve. Debian funcionó después de actualizar el host.'],
      ['Integridad de los respaldos', 'Se verificó SHA-256 en las copias externas. El archivo del host se cifró individualmente. El respaldo de vzdump quedó cifrado en reposo por el volumen BitLocker del disco externo.'],
      ['Recuperación', 'Debian arrancó en la VM restaurada y permitió iniciar sesión por consola con la red desconectada. La prueba de recuperación cubrió la VM.'],
    ],
    limits: [
      'El HDD HGST de 500 GB quedó fuera del almacenamiento confiable por problemas SMART. La batería de la laptop estaba degradada.',
      'Las pruebas térmicas fueron breves y moderadas. No hubo lectura de RPM del ventilador. La lectura ACPI anómala de 127 °C se excluyó de las mediciones de CPU Package. Quedó sin medir el comportamiento continuo y a carga máxima.',
      'Quedó pendiente una observación de mantenimiento del metapaquete GRUB/UEFI. El reinicio registrado fue satisfactorio.',
      'El entorno de un solo nodo carecía de alta disponibilidad. La verificación de las copias externas y la restauración cubrieron este ejercicio. La retención empresarial y la recuperación integral del host quedaron fuera del alcance.',
    ],
    lesson: 'La comprobación SHA-256 confirmó la integridad de la transferencia. El arranque y el inicio de sesión por consola demostraron que se podía recuperar una VM Debian utilizable.',
  },
};
