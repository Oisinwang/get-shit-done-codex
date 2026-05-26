Set-StrictMode -Version Latest

Add-Type -AssemblyName System.Drawing

$assetDir = $PSScriptRoot
$outputPath = Join-Path $assetDir 'social-preview.png'
$logoPath = Join-Path $assetDir 'gsd-logo-2000-transparent.png'

function ConvertTo-Color {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Hex,
    [int]$Alpha = 255
  )

  $color = [System.Drawing.ColorTranslator]::FromHtml($Hex)
  return [System.Drawing.Color]::FromArgb($Alpha, $color)
}

function New-SolidBrush {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Hex,
    [int]$Alpha = 255
  )

  return [System.Drawing.SolidBrush]::new((ConvertTo-Color -Hex $Hex -Alpha $Alpha))
}

function New-PixelFont {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Family,
    [Parameter(Mandatory = $true)]
    [float]$Size,
    [System.Drawing.FontStyle]$Style = [System.Drawing.FontStyle]::Regular
  )

  return [System.Drawing.Font]::new($Family, $Size, $Style, [System.Drawing.GraphicsUnit]::Pixel)
}

function New-RoundedRectanglePath {
  param(
    [Parameter(Mandatory = $true)]
    [System.Drawing.RectangleF]$Rectangle,
    [Parameter(Mandatory = $true)]
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()

  $path.AddArc($Rectangle.X, $Rectangle.Y, $diameter, $diameter, 180, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Y, $diameter, $diameter, 270, 90)
  $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($Rectangle.X, $Rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Fill-RoundedRectangle {
  param(
    [Parameter(Mandatory = $true)]
    [System.Drawing.Graphics]$Graphics,
    [Parameter(Mandatory = $true)]
    [System.Drawing.RectangleF]$Rectangle,
    [Parameter(Mandatory = $true)]
    [float]$Radius,
    [Parameter(Mandatory = $true)]
    [System.Drawing.Brush]$Brush
  )

  $path = New-RoundedRectanglePath -Rectangle $Rectangle -Radius $Radius
  try {
    $Graphics.FillPath($Brush, $path)
  } finally {
    $path.Dispose()
  }
}

function Stroke-RoundedRectangle {
  param(
    [Parameter(Mandatory = $true)]
    [System.Drawing.Graphics]$Graphics,
    [Parameter(Mandatory = $true)]
    [System.Drawing.RectangleF]$Rectangle,
    [Parameter(Mandatory = $true)]
    [float]$Radius,
    [Parameter(Mandatory = $true)]
    [System.Drawing.Pen]$Pen
  )

  $path = New-RoundedRectanglePath -Rectangle $Rectangle -Radius $Radius
  try {
    $Graphics.DrawPath($Pen, $path)
  } finally {
    $path.Dispose()
  }
}

$bitmap = [System.Drawing.Bitmap]::new(1280, 640, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$logo = $null

try {
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $background = New-SolidBrush '#07111f'
  $panel = New-SolidBrush '#0d1b2f'
  $panelSoft = New-SolidBrush '#10243d' 230
  $cyan = New-SolidBrush '#7dcfff'
  $green = New-SolidBrush '#a6e3a1'
  $white = New-SolidBrush '#f4f8ff'
  $muted = New-SolidBrush '#b7c4d8'
  $darkText = New-SolidBrush '#07111f'
  $tag = New-SolidBrush '#162b43'
  $linePen = [System.Drawing.Pen]::new((ConvertTo-Color '#1e3a52' 120), 2)
  $cyanPen = [System.Drawing.Pen]::new((ConvertTo-Color '#7dcfff' 210), 3)
  $greenPen = [System.Drawing.Pen]::new((ConvertTo-Color '#a6e3a1' 210), 3)

  $graphics.FillRectangle($background, 0, 0, 1280, 640)

  for ($x = 0; $x -le 1280; $x += 80) {
    $graphics.DrawLine($linePen, $x, 0, $x + 180, 640)
  }

  $graphics.FillRectangle((New-SolidBrush '#0b2035' 220), 0, 508, 1280, 132)
  $graphics.FillRectangle((New-SolidBrush '#7dcfff' 32), 0, 0, 1280, 12)
  $graphics.FillRectangle((New-SolidBrush '#a6e3a1' 80), 0, 612, 1280, 28)

  Fill-RoundedRectangle $graphics ([System.Drawing.RectangleF]::new(54, 58, 666, 404)) 22 $panel
  Stroke-RoundedRectangle $graphics ([System.Drawing.RectangleF]::new(54, 58, 666, 404)) 22 $cyanPen

  $eyebrowFont = New-PixelFont 'Segoe UI' 24 ([System.Drawing.FontStyle]::Bold)
  $headlineFont = New-PixelFont 'Segoe UI' 68 ([System.Drawing.FontStyle]::Bold)
  $headlineAccentFont = New-PixelFont 'Segoe UI' 78 ([System.Drawing.FontStyle]::Bold)
  $subtitleFont = New-PixelFont 'Segoe UI' 30 ([System.Drawing.FontStyle]::Regular)
  $tagFont = New-PixelFont 'Segoe UI' 22 ([System.Drawing.FontStyle]::Bold)
  $commandFont = New-PixelFont 'Consolas' 24 ([System.Drawing.FontStyle]::Bold)

  $graphics.DrawString('CODEX-FIRST GSD', $eyebrowFont, $green, 92, 94)
  $graphics.DrawString('GET SHIT DONE', $headlineFont, $white, 88, 138)
  $graphics.DrawString('CODEX', $headlineAccentFont, $cyan, 88, 210)
  $graphics.DrawString('Planned, resumable, verified AI coding workflows.', $subtitleFont, $muted, 92, 310)

  $commandRect = [System.Drawing.RectangleF]::new(88, 374, 604, 58)
  Fill-RoundedRectangle $graphics $commandRect 14 $green
  $graphics.DrawString('npx @oisinwang/get-shit-done-codex@latest', $commandFont, $darkText, 110, 390)

  $tags = @('AGENTS.md', '.codex/', '$gsd-*')
  $tagX = 88
  foreach ($label in $tags) {
    $size = $graphics.MeasureString($label, $tagFont)
    $rect = [System.Drawing.RectangleF]::new($tagX, 484, $size.Width + 32, 44)
    Fill-RoundedRectangle $graphics $rect 12 $tag
    Stroke-RoundedRectangle $graphics $rect 12 ([System.Drawing.Pen]::new((ConvertTo-Color '#31506d' 220), 2))
    $graphics.DrawString($label, $tagFont, $white, $tagX + 16, 494)
    $tagX += [int]$rect.Width + 16
  }

  if (Test-Path -LiteralPath $logoPath) {
    $logo = [System.Drawing.Image]::FromFile($logoPath)
    $logoAttributes = [System.Drawing.Imaging.ImageAttributes]::new()
    $matrix = [System.Drawing.Imaging.ColorMatrix]::new()
    $matrix.Matrix33 = 0.82
    $logoAttributes.SetColorMatrix($matrix)
    $graphics.DrawImage(
      $logo,
      [System.Drawing.Rectangle]::new(760, 120, 420, 300),
      0,
      0,
      $logo.Width,
      $logo.Height,
      [System.Drawing.GraphicsUnit]::Pixel,
      $logoAttributes
    )
    $logoAttributes.Dispose()
  }

  $terminalRect = [System.Drawing.RectangleF]::new(752, 406, 438, 112)
  Fill-RoundedRectangle $graphics $terminalRect 18 $panelSoft
  Stroke-RoundedRectangle $graphics $terminalRect 18 $greenPen
  $graphics.FillEllipse((New-SolidBrush '#ff6b6b'), 780, 432, 14, 14)
  $graphics.FillEllipse((New-SolidBrush '#f6c177'), 804, 432, 14, 14)
  $graphics.FillEllipse((New-SolidBrush '#a6e3a1'), 828, 432, 14, 14)
  $graphics.DrawString('$gsd-next -> plan -> verify', $commandFont, $cyan, 780, 466)

  $footerFont = New-PixelFont 'Segoe UI' 22 ([System.Drawing.FontStyle]::Regular)
  $graphics.DrawString('github.com/Oisinwang/get-shit-done-codex', $footerFont, $muted, 88, 574)

  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  if ($null -ne $logo) { $logo.Dispose() }
  if ($null -ne $graphics) { $graphics.Dispose() }
  if ($null -ne $bitmap) { $bitmap.Dispose() }
}

Write-Host "Wrote $outputPath"
